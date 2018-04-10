import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Badge from './Badge';
import styles from './nav.css';
{/* <Icon type="bars" /> */}
@withRouter
export default class extends Component {
    clkNode(tag){
        this.props.onChangeTag(tag);
        this.props.history.push('/');
    }
    render() {
        return(
            <div className = {styles.navBody}>
                {
                    Object.keys(this.props.fileMap || []).map(tag => {
                        return (
                            <div className  = {styles.navItem+' '+(this.props.tag === tag?styles.navItemSelected:'')}
                            onClick = {this.clkNode.bind(this,tag)}
                            >{tag}
                            <Badge style = {{position:'absolute',top:0,bottom:0,margin:'auto',right:'10px',zIndex:1,background:'#fff'}} title = {this.props.fileMap[tag]}/>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}