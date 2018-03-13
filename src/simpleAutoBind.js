
function myDecorator(target, name,{ value: fn, configurable, enumerable }) {
    if(!name){
        throw new Error('this decorator must be used for property');
    }
    return {
        configurable,
        enumerable,
        get() {
            if (target.isPrototypeOf(this)) {
                //如果target是this 的 原型
                if (!this.hasOwnProperty('constructor')) {
                    //确保this是一个实例
                    return fn.bind(this)
                }
            }
            throw new Error('the symbol this is not a instance');
        }
    }
}

export const SimpleAutoBind = myDecorator;

// @SimpleAutoBind
// class A {
//     // @myDecorator
//     test(xxx) {
//         console.log('test func', xxx, this.xxx);
//     }
//     xxx = 'this.xxx'
//     testB(xxx) {
//         this.test(xxx);
//     }
// }
// class C extends A {

// }


// let CA = new A();

// let CC = new C();
// // console.log(CC,CA)
// // CA.test('sss');
// // CA.testB('123');
// // CC.test('asd');
// // CC.testB('qwe');
// // let vvv = CA.test;
// // vvv('sadqweeqweqw');
// A.prototype.test
// C.prototype.test
// // CA.constructor.test;
// // A.prototype.test;
// // C.prototype.test;
// // console.log('xxxx',CA);