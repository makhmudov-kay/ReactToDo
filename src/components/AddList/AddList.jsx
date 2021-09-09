import React, {useState, useEffect} from 'react'
import axios from 'axios'

import List from '../List/List'
import './AddList.scss'
import Badge from '../Badge'
import closeSvg from '../../assets/img/close-btn.svg'


const AddList = ({colors, onAdd}) => {
    const [state, setState] = useState(false)
    const [selectedColor, selectColor] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if(Array.isArray(colors)) {
            selectColor(colors[0].id)
        }        
    }, [colors])

    const onClose = () => {
        setState(false);
        selectColor(colors[0].id);
        setInputValue('')
    }

    const addList = () => {
        if (!inputValue) {
            alert("Введите название папки")
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor}).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0]
            const listObj = {...data, color, tasks: []}
            onAdd(listObj)
            onClose()            
        }).catch(() => {
            alert("Ошибка при добавлении списка")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="add-list">
            <List onClick={() => setState(true)} items={[
                {
                    className: "list__add-button",
                    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>,
                    name: "Добавить список"
                }
            ]} />
            {state && <div className="add-list__popup">
                <img onClick={onClose} src={closeSvg} alt="close btn" className="add-list__popup-close" />
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="Название папки" />
                <div className="add-list__popup-colors">
                    {colors.map(color => <Badge 
                    onClick={() => selectColor(color.id)} 
                    key={color.id} 
                    color={color.name}
                    className={selectedColor === color.id && 'active'}
                    />)}
                </div>
                <button onClick={addList} className="button">
                    {isLoading ? "Добавление..." : "Добавить"}
                </button>
            </div>}
        </div>
    )
}

export default AddList;