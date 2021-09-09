import React from 'react'
import './badge.scss'
import classNames from 'classnames'

const Badge = ({color, onClick, className}) => (
    <i onClick={onClick} className={classNames('badge', {[`badge--${color}`]: color, 'active':className})}></i>
)

export default Badge