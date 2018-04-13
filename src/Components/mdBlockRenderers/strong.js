import React, { Component } from 'react';
import styles from './strong.css'
export default class extends Component {
    render() {
        // console.log(this.props);
        return (
            <strong className = {styles.strong} >
            {
                this.props.children
            }
            </strong>
        )
    }
} 