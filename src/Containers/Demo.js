import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group'
import './Anim.umcss';
// import { Button } from 'antd/lib/radio';

export default class extends Component {
    state = {
        items: [
            // { title: 'aaa', key: 1 }
        ]
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    let items = this.state.items;
                    items.unshift({
                        key: Date.now(),
                        title: Date.now()
                    })
                    this.setState({ items })
                }}>
                    增加一个
                </button>
                {/* <ul style={{ width: 400, height: 400, overflow: 'auto' }}>
                    <ReactCSSTransitionGroup
                        transitionName={'example'}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {
                            this.state.items.map(ele => {
                                return (
                                    <li style={liStyle} key={ele.key} >{ele.title}</li>
                                )
                            })
                        }
                    </ReactCSSTransitionGroup>
                </ul> */}

                <AnimAddList>
                    {
                        this.state.items.map(ele => {
                            return (
                                <AnimLi key={ele.key} >
                                    <div style={{ height: Math.random() * 100 + 20 }} >{ele.title}</div>
                                </AnimLi>
                            )
                        })
                    }
                </AnimAddList>

            </div>
        )
    }
}
const liStyle = {
    width: 200,
    border: '1px solid #678',
    margin: 5,
    overflow: 'hidden',
}

class AnimAddList extends Component {
    render() {
        return (
            <ReactTransitionGroup component="div">
                {this.props.children}
            </ReactTransitionGroup>
        )
    }
}
class AnimLi extends Component {
    componentWillAppear(callback) {
        console.log(this.props.children, 'willAppear');
        callback();
    }
    componentDidAppear() {
        console.log(this.props.children, 'Appear')
    }
    componentWillEnter(callback) {
        // console.log(this.props.children, 'willEnter',this.eleInstance);
        this.height = getComputedStyle(this.eleInstance).height;
        console.log(this.props.children, this.height);
        this.eleInstance.style.height = '0px';
        this.eleInstance.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            this.eleInstance.style.height = this.height;
        }, 0);
        callback();
    }
    componentDidEnter() {
    }
    render() {
        return (
            <div ref={(ins) => { this.eleInstance = ins; console.log('div mount') }} style={liStyle} >
                {this.props.children}
            </div>
        )
    }
}