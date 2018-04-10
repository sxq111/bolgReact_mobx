import React, { Component } from 'react';
import styles from './tag.css';
export default function Tag({ style = {},children }) {
    return (
        <div
            className = {styles.tag}
            style={{        
                ...style, 
            }}>
            {children}
        </div>
    )
}