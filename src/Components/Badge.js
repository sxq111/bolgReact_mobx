import React, { Component } from 'react';
import styles from './Badge.css';
export default function Badage({ title, style = {} }) {
    return (
        <div
            className = {styles.badge}
            style={{        
                color:'rgb(153, 153, 153)',   
                ...style, 
                display: 'inline-block',
                width: '1.55em',
                height: '1.55em',
                // border: '1px solid grey',
                lineHeight:'1.55em',
                borderRadius: 99999,
                textAlign:'center',
            }}>
            {title}
        </div>
    )
}