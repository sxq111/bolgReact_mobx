import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IMG from '../LazyImg';
@withRouter
export default class extends Component {

    render() {
        //本地图片
        let theImg = null;
        let newsrc = this.props.src;
        newsrc = newsrc.replace(/\//g,'\\');
        console.log(newsrc);
        if (/\\src\\articles/.test(newsrc)) {
            let path = (newsrc.split('\\src\\')[1]);
            path = path.split('\\');
            path.shift();
            path = path.join('/').split('?')[0];
            path = path.split('/');
            path = path[path.length -1];
            console.log(path);
            theImg = require(`../../articles/${this.props.match.params.tag}/${this.props.match.params.name}/imgs/${path}`);
            // console.log(this.props);
        }else{
            //网络图片
            theImg = newsrc;
        }
        return (
            <IMG alt = '暂无图片' src = {theImg} style = {{display:'block',margin:'0 auto',maxWidth:'100%'}} />
        )
    }
}