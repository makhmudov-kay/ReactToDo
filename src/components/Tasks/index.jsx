import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './Tasks.scss'
import editSvg from '../../assets/img/edit.svg'
import AddTaskForm from './AddTaskForm'
import Task from './Task'

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    } 

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list.color.hex}} className="tasks__title">
                    {list.name}
                    <img src={editSvg} onClick={editTitle} alt="Edit icon" />
                </h2>
            </Link>
            
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task onComplete={onCompleteTask} onRemove={onRemoveTask} onEdit={onEditTask} list={list} key={task.id} {...task} />                
                ))} 
                <AddTaskForm key={list.id} onAddTask={onAddTask} list={list} />                            
            </div>
        </div>
    )
}

export default Tasks
