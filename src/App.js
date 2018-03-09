import React, { Component } from 'react';
import stylesLess from './App2.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import Nav from './Components/Nav';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import FileMap from './articlesHelper/fileMap.json';

const SubMenu = Menu.SubMenu;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	async  componentDidMount() {
	}
	render() {
		return (
			<BrowserRouter>
				<div className={stylesLess.body}>
						<Nav fileMap={FileMap}
							onChangeTag={
								(tag) => {
									this.setState({ currentTag: tag });
								}
							} />
						{/* 文章列表区 */}
						<div style={{ height: '100%', width: 'auto', overflow: 'scroll', background: '#fff', overflowX: 'hidden' }}>
							<Switch>
								{/* 文章显示区 */}
								<Route path='/:tag/:name' component={Article} />
								<Route path='/'
									render={(props) => {
										return (<ArticleList tag={this.state.currentTag} />)
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
