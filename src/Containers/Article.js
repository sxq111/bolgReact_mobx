import React, { Component } from 'react';
import Article from '../Components/ArticleBody';
import AINav from '../Components/articleInsideNav';
const Gitment = require('gitment');
require('gitment/style/default.css');
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        let { match: { params } } = this.props;
        import(`../articles/${params.tag}/${params.name}`).then(md => {
            this.setState({ md: md.getArticle() });
        })
        let gitment = new Gitment({ ...window.gitmentConfig, id: `articles-${params.tag}-${params.name}` });
        gitment.render('container');
    }

    render() {
        return (
            <div style={{ padding: 10 }}>
                <div ref={(ins) => { this.articleIns = ins; }} style={{ width: '95%', margin: '0 auto' }}>
                    <Article source={this.state.md || null} />
                </div>
                {
                    this.articleIns && <AINav getElement = {()=>{return this.articleIns}} />
                }
                <div id='container' ></div>
            </div>
        );
    }
}
