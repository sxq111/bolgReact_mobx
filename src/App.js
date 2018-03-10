import React, { Component } from 'react';
import stylesLess from './App2.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import Nav from './Components/Nav';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import { observer } from 'mobx-react'

const SubMenu = Menu.SubMenu;

@observer
class App extends Component {
	constructor(props) {
		super(props);
	}
	async  componentDidMount() {
		// setInterval(()=>{
		// 	console.log(this.props.store.FileMapCount);
		// 	console.log(this.props.store.FileMapCount2);//不被computed修饰的有性能损失
		// },1000);
	}
	render() {
		const {store} = this.props;
		return (
			<BrowserRouter>
				<div className={stylesLess.body}>
					<Route path='/:tag/:name' render={(props) => {
						this.props.store.changeTag(props.match.params.tag);
						return null;
					}} />
					<Nav fileMap={this.props.store.FileMapCount}
						displayMode = {this.props.store.displayMode}
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
							<Route path='/timeLine' component={Article} />
							<Route path='/'
								render={(props) => {
									return (<ArticleList fileMap = {this.props.store.FileMap} tag={this.props.store.currentTag} />)
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
