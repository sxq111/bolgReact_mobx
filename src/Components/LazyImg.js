import React, { Component } from 'react';

export default class LazyImg extends Component {
    state = {
        seened:false
    }
    componentDidMount(){
        var io = new IntersectionObserver((arr)=>{
            if(arr[0].intersectionRatio>0.5){
                this.setState({seened:true});
                io.unobserve(this.ins);
            }
        });
        io.observe(this.ins);

    }
    render(){
        return (
            <React.Fragment>
                <div ref = {(ins)=>{this.ins = ins}}></div>
                {
                    !this.state.seened?<div style = {{border:'1px solid black'}}>图片加载中</div>:
                    <img src = {this.props.src}  style = {{...this.props.style}} />
                }
            </React.Fragment>
        );
    }
}