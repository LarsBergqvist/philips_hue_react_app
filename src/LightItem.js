import React from 'react';
import Toggle from 'material-ui/Toggle';


const LightItem = (props) => (
      <Toggle toggled={props.isOn} label={props.name} 
            onToggle={() => props.onToggleLight(props.id,props.isOn)}/>
   );

export default LightItem;
