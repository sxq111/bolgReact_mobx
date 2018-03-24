import React, { Component } from 'react';

export default class extends Component {
    componentDidMount() {
        this.props.onTimeline();
    }
    componentWillUnmount() {
        this.props.onNormal();
    }
    render() {
        return (<div>
            {
                this.props.timeLineData && this.props.timeLineData.map(data=>{
                    return (<p>{data.title}</p>)
                })
            }
        </div>)
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
