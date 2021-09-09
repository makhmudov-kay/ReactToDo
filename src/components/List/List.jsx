import React from 'react'
import axios from 'axios'

import './List.scss'
import classNames from 'classnames'
import Badge from '../Badge'
import removeSvg from '../../assets/img/close.svg'

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {   
    
    const removeList = (item) => {
        if (window.confirm(`Вы действительно хотите удалить раздел "${item.name}"?`)) {          
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => {
                return <li onClick={onClickItem ? () => onClickItem(item) : null} key={index} className={classNames(item.className, {'active': item.active ? item.active : activeItem && activeItem.id === item.id})}>
                    <i>{item.icon ? (item.icon) : (<Badge color={item.color.name}/>)}</i>
                    <span>{item.name}{item.tasks && ` (${item.tasks.length})`}</span>
                    {isRemovable && <img onClick={() => removeList(item)} className="list__remove-icon" src={removeSvg} alt="Remove icon" />}
                </li>
            })}
        </ul>
    )
};

export default List;