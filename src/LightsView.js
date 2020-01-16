import React, { Component } from 'react';
import LightItem from './LightItem';
import Config from './config';

class LightsView extends Component {
    constructor(props) {
        super(props);
        this.requestFailed = false;
        this.data = null;

        this.onToggleLight = this.onToggleLight.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onBrightnessChanged = this.onBrightnessChanged.bind(this);
        setInterval(this.fetchData, 5000);
    }

    componentDidMount() {
        this.fetchData();
    }

    getUrlWithUsername() {
        return Config.apiUrl + '/api/' + Config.username + '/lights';
    }

    fetchData() {
        const url = this.getUrlWithUsername();

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.data = d;
                this.requestFailed = false;
                this.setState({ newData: new Date() });
            }, () => {
                this.requestFailed = true;
                this.setState({ newData: new Date() });
            })
    }

    changeState(id, bodyData) {
        const url = this.getUrlWithUsername() + '/' + id + '/state';

        fetch(url, { method: 'PUT', body: bodyData })
            .then(response => {
                if (!response.ok) {
                    throw Error('Network request failed');
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.requestFailed = false;
                this.fetchData();
            }, () => {
                this.requestFailed = true;
            })
    }

    onToggleLight(id, isOn) {
        const bodyData = '{"on":' + !isOn + '}';
        this.changeState(id, bodyData);
    }

    onBrightnessChanged(id, newValue) {
        const bodyData = '{"bri":' + newValue + '}';
        this.changeState(id, bodyData);
    }

    render() {
        if (this.requestFailed) {
            const url = this.getUrlWithUsername();
            return <p className='warning'>Could not fetch from {url}</p>
        }

        if (!this.data) {
            return <p>Loading...</p>;
        }

        if (this.data[0] !== undefined) {
            return <p className='warning'>{this.data[0].error.description}</p>;
        }

        const data = this.data;
        const lightItems = [];
        const toggleHandler = this.onToggleLight;
        const brightnessHandler = this.onBrightnessChanged;
        Object.keys(data).forEach(function (id, index) {
            const item = data[id];
            const light = <LightItem key={id} id={id} name={data[id].name}
                isOn={item.state.on} bri={item.state.bri}
                reachable={item.state.reachable}
                onToggleLight={toggleHandler}
                onBrightnessChanged={brightnessHandler} />
            lightItems.push(light);
        });

        return (
            <div align='center' style={{ maxWidth: 950, margin: '20px auto 0' }}>
                {lightItems}
            </div>
        );
    }
}

export default LightsView;
