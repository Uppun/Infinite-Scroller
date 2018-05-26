import React, { Component } from 'react';
import './main.css';

export default class Scroller extends Component {
    scrollRef = React.createRef();
    state = {
        topIndex: 0, 
        bottomIndex: 0,
    };

    componentDidMount() {
        this.handleScroll();
    }

    handleScroll = () => {
        const scroller = this.scrollRef.current;
        const {elementHeight, children} = this.props;
        this.setState({
            topIndex: Math.floor(scroller.scrollTop / elementHeight),
            bottomIndex: Math.min(Math.ceil((scroller.scrollTop + scroller.clientHeight) / elementHeight), children.length),
        });
    };

    render() {
        const {elementHeight, children, renderChild} = this.props;
        const {topIndex, bottomIndex} = this.state;

        const topHeight = topIndex * elementHeight;
        const bottomHeight = (children.length - bottomIndex) * elementHeight;

        const visibleChildren = children.slice(topIndex, bottomIndex).map(renderChild);

        return (
            <div className="Scroller" ref={this.scrollRef} onScroll={this.handleScroll}>
                <div style={{height: topHeight}} />
                {visibleChildren}
                <div style={{height: bottomHeight}} />
            </div>
        );
    }
}