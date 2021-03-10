import React from 'react';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const LightItem = (props) => (
    <div className='items'>
        <div className='item toggle'>

            <FormControlLabel
                control={
                    <Switch
                        checked={props.isOn}
                        onChange={() => props.onToggleLight(props.id, props.isOn)}
                        name={props.name}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        disabled={!props.reachable}
                        color="primary"
                    />
                }
                label={props.name}
            />
            {props.reachable ? '' : <div className='warning'>not reachable</div>}
        </div>
        {props.reachable ?
            <div className='item slider'>
                <Slider
                    min={0}
                    max={255}
                    step={1}
                    value={props.bri}
                    onChange={(event, newValue) => props.onBrightnessChanged(props.id, newValue)}
                />
            </div> : ''}
    </div>
);

export default LightItem;
