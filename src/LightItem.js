import React from 'react';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

const LightItem = (props) => (
      <div className="cells">
         <div className="cell toggle">
         <Toggle toggled={props.isOn} label={props.name} 
            onToggle={() => props.onToggleLight(props.id,props.isOn)}
         />
         </div>
         <div className="cell slider">
         <Slider
            min={0}
            max={255}
            step={1}
            value={props.bri}
            onChange={(object,newValue) => props.onBrightnessChanged(props.id,newValue)}     
         />
         </div>
      </div>
   );

export default LightItem;
