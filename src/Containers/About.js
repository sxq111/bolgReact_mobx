import React, { Component } from 'react';
import Badage from '../Components/Badge';
import photo from './imgs/favicon.ico';
import Card from '../Components/Card';
import Tag from '../Components/Tag';

export default class extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style = {{width:'100%',padding:10}}>
                <Badage 
                 title = {  <img src = {photo} style ={{width:'100%',height:'100%'}}/>}
                 style = {{overflow:'hidden',display:'block',margin:'0 auto',width:'50px',height:'50px'}}></Badage>
                <Card style = {{ margin:'5px auto',width:'80%',maxWidth:400,minHeight:200,padding:'10px'}}>
                    <div style={{lineHeight:'2em'}} >
                        大家好，我叫宋锡铨，是一名菜鸟前端。
                        <br/>
                        欢迎您来到我的博客。
                        <br/>
                        我使用的技术为React全家桶。欢迎大家与我交流。
                        <br/>
                        <Tag>
                        QQ:1044955115
                        </Tag>
                        <br/>
                        <Tag>
                        github:<a href= 'https://github.com/sxq111'>sxq111</a>
                        </Tag>
                        <br/>
                        <Tag>
                        掘金:<a href= 'https://juejin.im/user/59db13d5518825350f42507a'>宋锡铨的掘金</a>
                        </Tag>
                    </div>
                </Card>
            </div>
        )
    }
}