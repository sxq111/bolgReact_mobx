import React, { Component } from 'react';
import stylesLess from './App2.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import Nav from './Components/Nav';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import { observer } from 'mobx-react';
import Timeline from './Containers/TimeLine';

const SubMenu = Menu.SubMenu;




@observer
// @makeDecotratorClass('修饰类')
class App extends Component {
	constructor(props) {
		super(props);
	}
	@makeDecotrator('修饰类方法属性')
	test() {}
	// @makeDecotrator('修饰类变量属性')
	xxx = 'x发的我xx'
	async  componentDidMount() {
	}
	render() {
		const { store } = this.props;
		return (
			<BrowserRouter>
				<div className={stylesLess.body}>
					<Route path='/:tag/:name' render={(props) => {
						this.props.store.changeTag(props.match.params.tag);
						return null;
					}} />
					<Nav fileMap={this.props.store.FileMapCount}
						displayMode={this.props.store.displayMode}
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
							<Route path='/timeLine' render={(props) => {
								return (
									<Timeline
										timeLineData={store.TimeLineFile}
										onNormal={store.triggerDisplayModeNormal}
										onTimeline={store.triggerDisplayModeTimekline}
									/>)
							}} />
							<Route path='/'
								render={(props) => {
									return (<ArticleList fileMap={this.props.store.FileMap} tag={this.props.store.currentTag} />)
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



function makeDecotrator(id) {//对于属性来说，装饰器应该返回属性描述符

	return  (target, prop_name, descObj)=> {
		console.log(id,target);//这里使用settimeout的原因是 装饰器在编译时执行，那时候App类还没有被建立，所以不加异步，App会是undefined
		setTimeout(()=>{console.log(App.prototype === target)},0);//经过尝试，这里的target就是App.protptype
	}
}
function makeDecotratorClass(id) {//对于类来说，装饰器返回的就应该是一个类
	return function testDecorater(t, p2, p3) {//这样才会变量提升
		console.log(id,t, p2, p3);
		return class extends Component {
			render(){
				return(<div>aaaa</div>)
			}
		}; 
	}
}
let testApp = new App();
testApp.test();
// let a = 'sss';
// @makeDecotrator('变量')

// console.log(new App());