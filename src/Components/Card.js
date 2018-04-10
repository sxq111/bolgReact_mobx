import React, { Component } from 'react';
import styles from './card.css';
export default function Card({ style = {},children,className = '' }) {
    return (
        <div
            className = {styles.card + ' ' +className}
            style={{        
                ...style, 
                border:'1px solid grey',
                borderRadius:10,
                minWidth:100
            }}>
            {children}
        </div>
    )
}