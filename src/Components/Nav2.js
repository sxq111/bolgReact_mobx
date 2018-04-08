import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './nav.css';
{/* <Icon type="bars" /> */}
@withRouter
export default class extends Component {
    render() {
        return(
            <div style={{ width: 100 }} className = {styles.navBody}>
                {
                    Object.keys(this.props.fileMap || []).map(tag => {
                        return (
                            <div className  = {styles.navItem}>{tag}</div>
                        );
                    })
                }
            </div>
        )
    }
}