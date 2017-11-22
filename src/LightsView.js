import React, { Component } from 'react';
import LightItem from './LightItem';
import Config from './config';

class LightsView extends Component {
   constructor(props) {
      super(props);
      this.requestFailed = false;
      this.data = null;

      this.onToggleLight = this.onToggleLight.bind(this);
      this.getUrlWithUsername = this.getUrlWithUsername.bind(this);
      this.fetchData = this.fetchData.bind(this);
      setInterval(this.fetchData,5000);
   }

   componentWillMount() {
      this.fetchData();
   }

   getUrlWithUsername() {
      return Config.apiUrl + '/api/' + Config.username + '/lights';
   }
   fetchData() {
      let url = this.getUrlWithUsername();

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
            this.setState({newData:new Date()});
          }, () => {
            this.requestFailed = true;
            this.setState({newData:new Date()});
         })
      }

   changeState(id,on) {
      let bodyData = '{"on":' + on + '}';

      let url = this.getUrlWithUsername() + '/' + id + '/state';
      
      fetch(url,
            { method: 'PUT', body: bodyData })
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
      this.changeState(id, !isOn);
   }

   render() {
      if (this.requestFailed) {
         let url = this.getUrlWithUsername();
         return <p>Could not fetch from {url}</p>
      }

      if (!this.data) {
         return <p>Loading...</p>
      }

      let data = this.data;
      let lightItems = [];
      let clickHandler = this.onToggleLight;
      Object.keys(data).forEach(function(id,index) {
         let item = data[id];
         let light = <LightItem key={id} id={id} name={data[id].name} 
         isOn={item.state.on} onToggleLight={clickHandler}/>
         lightItems.push(light);
      });
      return (
         <div align="center" style={{maxWidth:250,margin: '20px auto 0'}}>
            {lightItems}
         </div>
      );
   }
}

export default LightsView
