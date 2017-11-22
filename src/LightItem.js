import React, { Component } from 'react';

class LightItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id,this.props.isOn);
    }

    render() {
        let imgNode = <img src={require('./off_button.gif')} onClick={this.onClick}/>
        if (this.props.isOn) {
            imgNode =<img src={require('./on_button.gif')} onClick={this.onClick}/>;
        }

        return (
            <tr>
            <td>{this.props.name}</td>
            <td>{imgNode}</td>
            </tr>
        );
        

    }
}

export default LightItem;