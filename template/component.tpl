import React from 'react';

class NEW_COMP extends  React.Component {
    componentDidMount(): void {
        console.log('组件初始化执行, 并且只执行一次');
    }
    componentDidUpdate(): void {
        console.log('组件更新执行');
    }
    componentWillUnmount(): void {
        console.log('组件卸载的时候才会执行');
    }
    componentDidCatch(): void {
        console.log('组件出错的时候会执行');
    }
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    methods = {
        get() {

        }
    };
    render() {
        return(
            <div>
                NEW_COMP
            </div>
        )
    }
}
export default NEW_COMP;
