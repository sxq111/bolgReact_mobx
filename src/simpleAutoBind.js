export const SimpleAutoBind = myDecorator;
export const debounceIntervalDecorator = makeDebounce;

function myDecorator(target, name, { value: fn, configurable, enumerable }) {
    if (!name) {
        throw new Error('this decorator must be used for class property');
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

function makeDebounce(step = 100) {
    return function debounce(target, name, { value: fn }) {
        if (!name) {
            throw new Error('this decorator must be used for class property');
        }
        let lastTimer = null;
        function getTimmer() {
            return lastTimer;
        }
        return {
            value: function (...args) {
                if (lastTimer) {
                    clearInterval(lastTimer);
                }
                lastTimer = setInterval(fn.bind(this, getTimmer, ...args), step);
            }

        }
    }
}
