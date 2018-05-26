import React, { Component } from 'react';
import './main.css';

export default class Scroller extends Component {
    scrollRef = React.createRef();
    state = {
        topDiv: 0, 
        bottomDiv: 0,
        topIndex: 0, 
        bottomIndex: 0,
    };


    handleScroll = () => {
        const {current} = this.scrollRef;
        const {elementHeight} = this.props;
        
        const topIndex = Math.floor(current.scrollTop/elementHeight);
        const bottomIndex = Math.ceil((current.scrollTop + current.height)/elementHeight) > this.props.children.length ? 
                                this.props.children.length
                                : Math.ceil((current.scrollTop + current.height)/elementHeight);
        const topDiv = topIndex * elementHeight;
        const bottomDiv = (this.props.children.length - bottomIndex)*elementHeight;

        this.setState({topIndex, bottomIndex, topDiv, bottomDiv});
    }

    componentDidMount() {
        const {current} = this.scrollRef;
        const {elementHeight} = this.props;
        
        const topIndex = Math.floor(current.scrollTop/elementHeight);
        const bottomIndex = Math.ceil((current.scrollTop + current.height)/elementHeight);
        const topDiv = topIndex * elementHeight;
        const bottomDiv = (this.props.children.length - bottomIndex)*elementHeight;

        this.setState({topIndex, bottomIndex, topDiv, bottomDiv});
    }

    render() {
        let childArray = [];
        const {topIndex, bottomIndex} = this.state;


        for(let i = 0; i < (bottomIndex - topIndex); i++) {
            childArray.push(this.props.children[i + topIndex]);
        }

        return (
            <div className="Scroller" ref={this.scrollRef} onScroll={this.handleScroll}>
                <div className="topDiv" style={{height: this.state.topDiv}}/>
                {childArray.map(element => {
                    return this.props.renderChild(element);
                })}
                <div className="bottomDiv" style={{height: this.state.bottomDiv}}/>
            </div>
        );
    }
}