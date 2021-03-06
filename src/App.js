import React, { Component } from 'react';
import stylesLess from './App2.less';
import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav2 from './Components/Nav2';
import Nav2M from './Components/Nav2mobile';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import { observer } from 'mobx-react';
import About from './Containers/About';
import { SimpleAutoBind, waitingForDecorator, testDesc } from 'SRC/simpleAutoBind';
import Demo from './Containers/Demo';

@observer
class App extends Component {
	state = {val:0}
	constructor(props) {
		super(props);
	}
	@testDesc('实例属性1')
	xxx = 'xxx';
	@testDesc('实例属性2')
	test = () => {

	}
	@testDesc('原型方法')
	componentDidMount() {
		this.setState({val:this.state.val+1});
		console.log(this.state.val);//0
		this.setState({val:this.state.val+1});
		console.log(this.state.val);//0
		setTimeout(()=>{
			this.setState({val:this.state.val+1});
			console.log(this.state.val);//2
			this.setState({val:this.state.val+1});
			console.log(this.state.val);
		},0);
	}
	@SimpleAutoBind
	changeTag(tag) {
		this.props.store.changeTag(tag);
	}
	@waitingForDecorator
	testClk(fin) {
		let promise = new Promise((resolve) => {
			console.log('promise start')
			setTimeout(() => { resolve('asdadsads') }, 2000);
		});
		promise.then(rst => {
			fin();
			console.log('promise Fin', rst);
		})
	}
	render() {
		const { store } = this.props;
		console.log(this.props.store);
		return (
			<BrowserRouter>
				<div className={stylesLess.body}>
					{/* <Button onClick = {this.testClk} >测试</Button> */}
					<Route path='/:tag/:name' render={(props) => {
						if (this.props.store.currentTag !== props.match.params.tag) {
							this.props.store.changeTag(props.match.params.tag);//这里会导致一个  不要在render中更新的警告，但是实际上不会产生问题
						}
						return null;
					}} />
					<Nav2 fileMap={this.props.store.FileMapCount}
						displayMode={this.props.store.displayMode}
						tag={this.props.store.currentTag}
						onChangeTag={this.changeTag} />
					<Nav2M
						fileMap={this.props.store.FileMapCount}
						displayMode={this.props.store.displayMode}
						tag={this.props.store.currentTag}
						onChangeTag={this.changeTag}
					/>
					{/* 文章列表区 */}
					<div id='articleMain' style={{ height: '100%', width: 'auto', overflow: 'scroll', background: '#fff', overflowX: 'hidden', paddingBottom: 40 }}>
						<Switch>
							{/* 文章显示区 */}
							<Route path='/:tag/:name' component={Article} />
							<Route path='/demo' component={Demo} />
							<Route path='/articleList'
								render={(props) => {
									return (<ArticleList fileMap={this.props.store.FileMap} tag={this.props.store.currentTag} />)
								}}
							/>
							<Route path='/' component = {About}  />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;



// function makeDecotrator(id) {//对于属性来说，装饰器应该返回属性描述符（不反回直接修改也是可疑以的，因为他是对象）

// 	return  (target, prop_name, descObj)=> {
// 		console.log(id,target);//这里使用settimeout的原因是 装饰器在编译时执行，那时候App类还没有被建立，所以不加异步，App会是undefined
// 		setTimeout(()=>{console.log(App.prototype === target)},0);//经过尝试，这里的target就是App.protptype
// 	}
// }
// function makeDecotratorClass(id) {//对于类来说，装饰器返回的就应该是一个类
// 	return function testDecorater(t, p2, p3) {//这样才会变量提升
// 		console.log(id,t, p2, p3);
// 		return class extends Component {
// 			render(){
// 				return(<div>aaaa</div>)
// 			}
// 		}; 
// 	}
// }
// let testApp = new App();
// testApp.test();
// let a = 'sss';
// @makeDecotrator('变量')

// console.log(new App());