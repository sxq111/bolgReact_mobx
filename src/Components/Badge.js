import React, { Component } from 'react';
import styles from './Badge.css';
export default function Badage({ title, style = {} }) {
    return (
        <div
            className = {styles.badge}
            style={{        
                width: '1.55em',
                height: '1.55em',
                // border: '1px solid grey',
                lineHeight:'1.55em',
                color:'rgb(153, 153, 153)',   
                display: 'inline-block',
                ...style, 

                borderRadius: '50%',
                textAlign:'center',
            }}>
            {title}
        </div>
    )
}