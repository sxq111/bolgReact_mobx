import React, { Component,PureComponent } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group'
import './Anim.umcss';
// import { Button } from 'antd/lib/radio';
const cryptoJs = require('crypto-js');

export default class extends Component {
    state = {
        items: [
            // { title: 'aaa', key: 1 }
        ]
    }
    componentDidMount() {
        let p1reject;
        let p1 = new Promise((resolve,reject) => {
            p1reject = reject;
            setTimeout(() => {
                resolve('fin');
            }, 10000);
        });
        setTimeout(() => {
            p1reject('rej')
        }, 5000);
        p1.then(rst => {
            console.log('p1 fin', rst);
        }, err => {
            console.log('p1 rejected', err);
        });
    }
    // componentWillReceiveProps(p1,p2){
    //     console.log('willreceieve',p1,p2);
    //     this.setState({tttt2:'asdasd'});
    // }
    shouldComponentUpdate(nextProps,nextState){
        console.log('thisState',this.state)
        console.log('nextState',nextState)
        return true;
    }
    goodProp(){}
    render() {
        console.log('crypto',cryptoJs.AES.encrypt('sxq111', '123456789').toString(),cryptoJs.AES.encrypt('sxq111', '123456789'),cryptoJs.enc)
        return (
            <div>
                <button onClick = {()=>{this.setState({test:'aaa'})}}>test update</button>
                <button onClick={() => {
                    let items = this.state.items;
                    items.unshift({
                        key: Date.now(),
                        title: Date.now(),
                        height: Math.floor(Math.random() * 100 + 20)
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
                                    <div style={{ boxSizing:'border-box',height: ele.height, margin: 5, border: '1px solid black', position: 'relative' }} >
                                        <span style={{ position: 'absolute', color: '#f00', cursor: 'pointer', right: 5, top: 5 }} onClick={(() => {
                                            let index_del = this.state.items.reduce((resultPrev, currentEle, index) => {
                                                if (currentEle.key === ele.key)
                                                    return index;
                                                else
                                                    return resultPrev;
                                            }, null);
                                            let arr = this.state.items;
                                            console.log(index_del);
                                            if (index_del!== null) {
                                                arr.splice(index_del, 1);
                                                this.setState({ items: arr });
                                            }
                                        })} >X</span>
                                        {ele.title}
                                    </div>
                                </AnimLi>
                            )
                        })
                    }
                </AnimAddList>
                <JustChild prop = {this.goodProp}/>
            </div>
        )
    }
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
        console.log( 'start change height',this.height);
        this.eleInstance.style.height = '0px';
        this.eleInstance.style.transition = 'height 0.3s ease';
        console.log(Date.now(), 'start change trans');
        callback();
        // }, 0);
    }
    componentDidEnter() {
        setTimeout(() => {
            this.eleInstance.style.height =Math.ceil(Number.parseFloat(this.height))+'px';
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
        const liStyle = {
            overflow: 'hidden',
        }
        return (
            <div ref={(ins) => {
                if (!this.eleInstance) { console.log('div mount') }
                this.eleInstance = ins;
            }} style={{...this.props.style,...liStyle}} >
                {this.props.children}
            </div>
        )
    }
}
class JustChild extends PureComponent{

    render(){
        console.log('child render');
        return(<span>child</span>)
    }
}