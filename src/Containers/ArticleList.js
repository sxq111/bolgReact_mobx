import React, { Component } from 'react';
// import { Tag } from 'antd';
import Tag from '../Components/Tag';
import Card from '../Components/Card';
import styles from './ArticleList.css';
import { Link } from 'react-router-dom';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        }
    }
    componentDidMount() {
        if (this.props.tag) {
            this.getArticles(this.props);
        }
    }
    componentWillReceiveProps(p1, p2) {
        if (p1.tag) {
            this.getArticles(p1);
        }
    }
    getArticles(p1) {
        let arr = [];
        Object.keys(this.props.fileMap[p1.tag]).map(articleName => {
            let articleHelper = require('../articles/' + p1.tag + '/' + articleName);
            let basicInfo = articleHelper.getBasicInfo();
            let time = new Date(basicInfo.time);
            basicInfo.menTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + ' ' + time.getHours() + '时' + time.getMinutes() + '分';
            arr.push({
                basicInfo: basicInfo,
                overviewPic: articleHelper.getOverviewPic(),
                title: articleName,
                tag: p1.tag
            })
            this.setState({ articleData: arr });
        })
    }
    render() {
        console.log(this.state.articleData);
        return (
            <div>
                {
                    this.state.articleData.map(data => {
                        return (
                            <Card
                                className = {styles.articleItem}
                                style={{float: 'left'}}
                            >
                                <div style={{ width: '100%', height: 150 ,borderRadius:10,overflow:'hidden'}}>
                                    <img style={{ height: '100%', width: '100%' }} alt="暂无图片" src={data.overviewPic} />
                                </div>
                                <Tag style = {{marginTop:10,marginBottom:10}}>{'发布时间：' + data.basicInfo.menTime}</Tag>
                                <br/>
                                <Tag ><Link to={`/${data.tag}/${data.title}`}>{'标题：' + data.title}</Link></Tag>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}