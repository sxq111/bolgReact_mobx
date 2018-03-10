import React, { Component } from 'react';
import stylesLess from './App2.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import Nav from './Components/Nav';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import FileMap from './articlesHelper/fileMap.json';
import { observer } from 'mobx-react'

const SubMenu = Menu.SubMenu;

// @Observer()
@observer
class App extends Component {
	constructor(props) {
		super(props);
	}
	async  componentDidMount() {
		// console.log(this.props.store.changeTag)
	}
	render() {
		return (
			<BrowserRouter>
				<div className={stylesLess.body}>
					<Route path='/:tag/:name' render={(props) => {
						this.props.store.changeTag(props.match.params.tag);
						return null;
					}} />
					<Nav fileMap={FileMap}
						tag={this.props.store.currentTag}
						onChangeTag={
							(tag) => {
								this.props.store.changeTag(tag);
							}
						} />
					{/* 文章列表区 */}
					<div style={{ height: '100%', width: 'auto', overflow: 'scroll', background: '#fff', overflowX: 'hidden' }}>
						<Switch>
							{/* 文章显示区 */}
							<Route path='/:tag/:name' component={Article} />
							<Route path='/'
								render={(props) => {
									return (<ArticleList tag={this.props.store.currentTag} />)
								}}
							/>
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
