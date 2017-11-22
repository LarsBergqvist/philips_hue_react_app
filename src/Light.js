import React, { Component } from 'react';

class Light extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id,this.props.state);
    }

    render() {
        let imgNode = <img src={require('./off_button.gif')} onClick={this.onClick}/>
        if (this.props.state === 'on') {
            imgNode =<img src={require('./on_button.gif')} onClick={this.onClick}/>;
        }

        return (
            <div>
            <div>{this.props.name} {this.props.state}</div>
            <div>{imgNode}</div>
            </div>
        );
        

    }
}

export default Light;