import React, { Component } from 'react';

export default class extends Component {
    componentDidMount(){
        this.props.onTimeline();
        setInterval(()=>{
            console.log(this.props.timeLineData);
        },1000)
    }
    componentWillUnmount(){
        this.props.onNormal();
    }
    render(){
        return (<div></div>)
    }
}