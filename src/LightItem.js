import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

class LightItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
            <Toggle toggled={this.props.isOn} label={this.props.name} 
            onToggle={() => this.props.onToggleLight(this.props.id,this.props.isOn)}/>
      );
    }
}

export default LightItem;