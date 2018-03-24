import React, { Component } from 'react';

export default class extends Component {
    componentDidMount() {
        this.props.onTimeline();
        // setInterval(()=>{
        //     console.log(this.props.timeLineData);
        // },1000)
    }
    componentWillUnmount() {
        this.props.onNormal();
    }
    render() {
        // console.log(
        //     getNum_N([1, 1], (n, calculator) => {
        //         if (n <= 2)
        //             return 1;
        //         return calculator(n - 1) + calculator(n - 2);
        //     })(10)
        // );
        // console.log(
        //     getNum_N([1], (n, calculator) => {
        //         if (n <= 1)
        //             return 1;
        //         return calculator(n - 1) * n;
        //     })(5)
        // );
        return (<div></div>)
    }
}
// const getNum_N = function (knowedValues = [], logicFunc) {
//     const calculator = (num) => {
//         if (knowedValues[num] !== undefined) {
//             return knowedValues[num];
//         }
//         knowedValues[num] = logicFunc(num, calculator);
//         return knowedValues[num];
//     }
//     return calculator;
// }

// const badFib = (n) => {
//     if (n <= 2) {
//         return 1;
//     }
//     return badFib(n - 1) + badFib(n - 2);
// }
