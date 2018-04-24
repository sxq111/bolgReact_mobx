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
                        title: Date.now(),
                        height: (Math.random() * 100 + 20)
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
                                    <div style={{ height: ele.height, margin: 5, border: '1px solid black', position: 'relative' }} >
                                        <span style={{ position: 'absolute', color: '#f00', cursor: 'pointer', right: 5, top: 5 }} onClick={(() => {
                                            let index_del = this.state.items.reduce((resultPrev, currentEle, index) => {
                                                if (currentEle.key === ele.key)
                                                    return index;
                                                else
                                                    return resultPrev;
                                            }, null);
                                            let arr = this.state.items;
                                            arr.splice(index_del, 1);
                                            this.setState({ items: arr })
                                        })} >X</span>
                                        {ele.title}
                                    </div>
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
        callback();
    }
    componentDidAppear() {
    }
    componentWillEnter(callback) {
        // setTimeout(() => {
        this.eleInstance.style.height = 'auto';
        this.height = getComputedStyle(this.eleInstance).height;
        console.log(Date.now(), 'start change height');
        this.eleInstance.style.height = '0px';
        this.eleInstance.style.transition = 'height 0.3s ease';
        console.log(Date.now(), 'start change trans');
        callback();
        // }, 0);
    }
    componentDidEnter() {
        setTimeout(() => {
            this.eleInstance.style.height = this.height;
        }, 100);
    }
    componentWillLeave(callback) {
        this.eleInstance.style.height = '0px';

        setTimeout(() => {
            callback();
        }, 400);
    }
    componentDidLeave() {

    }
    render() {
        return (
            <div ref={(ins) => {
                if (!this.eleInstance) { console.log('div mount') }
                this.eleInstance = ins;
            }} style={liStyle} >
                {this.props.children}
            </div>
        )
    }
}