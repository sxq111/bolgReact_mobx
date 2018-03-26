import React, { Component } from 'react';
import {debounceDecorator} from 'SRC/simpleAutoBind';
export default class extends Component {
    state = { headings: [] }
    componentDidMount() {
        let ele = this.props.getElement();
        let tags = ele.children[0].children;
        let Hs = [];
        this.articleBody = document.getElementById('articleMain');
        setTimeout(() => {
            for (let node of tags) {
                if (node.tagName[0] === 'H' && node.tagName.length === 2)
                    Hs.push(node);
            }
            this.setState({ headings: Hs });
            this.timmer = setInterval(() => {
                //确定当前章节
                let i = 0;
                let currentIndex = null;
                for (ele of this.state.headings) {
                    if (this.isNodeInClient(ele).in) {
                        currentIndex = i;
                        break;
                    }
                    i++;
                }
                if (!currentIndex) {
                    for (let n = this.state.headings.length - 1; n > -1; n--) {
                        if (this.isNodeInClient(this.state.headings[n]).direction === 'top') {
                            currentIndex = n;
                            break 
                        }
                    }
                }
                this.setState({currentNode:currentIndex});
            }, 100);
        }, 1000)
    }
    isNodeInClient(node) {
        let rect = node.getBoundingClientRect();
        let clientHeight = document.documentElement.clientHeight;
        if (rect.bottom < clientHeight + rect.height / 2 && rect.top > 0 - rect.height / 2) {
            return {
                in: true
            }
        } else {
            return {
                in: false,
                direction: rect.bottom >= clientHeight + rect.height / 2 ? 'down' : 'top'
            }
        }
    }
    componentWillUnmount() {
        clearInterval(this.timmer);
    }
    @debounceDecorator(1000/60)
    clkHLink(getTimmer,h){
        console.log('intervaling');
        let timmer = getTimmer();
        let rect = h.getBoundingClientRect();
        let speed = rect.top/5;
        if(rect.top>-5 && rect.top<5){
            clearInterval(timmer);
        }
        if(Math.abs(this.articleBody.scrollTop + this.articleBody.clientHeight - this.articleBody.scrollHeight)<=5 && speed>0){
            clearInterval(timmer);
        }
        this.articleBody.scrollBy(0,speed);
    }
    render() {
        return (
            <div style={{ position: 'fixed', right: 0, top: 20, background: '#ddd' }}>
                {
                    this.state.headings.map((h, index) => (
                        <p
                            onClick = {this.clkHLink.bind(this,h)}
                            key={index}
                            style={{ color: this.state.currentNode === index ? 'green' : 'black' }}
                        >{h.innerText}</p>))
                }
            </div>
        )
    }
}