var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting`,target,key,receiver);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting `,target,key,value,receiver);
        return Reflect.set(target, key, value, receiver);
    }
});
obj.count = 111;
let k = obj.count;


// class A {
//     XXX = '123'
// }
// let a= new A();
// // Object.
// console.log(a.hasOwnProperty('XXX'))