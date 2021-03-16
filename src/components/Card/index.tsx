import React from 'react'

import styles from '../../styles/components/Cards.module.css'

export const Card = props => {
    return (
        <div className={`${styles.card} ${props.cname}`}></div>
    )
}