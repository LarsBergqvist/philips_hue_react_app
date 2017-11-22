import React, { Component } from 'react';
import LightItem from './LightItem';
import Config from './config';

class LightsView extends Component {
   constructor(props) {
      super(props);
      this.requestFailed = false;
      this.data = null;
      this.state = {
         newData : false
      }

      this.onClick = this.onClick.bind(this);
   }

   componentWillMount() {
      this.fetchData();
   }

   getUrlWithUsername() {
      return Config.apiUrl + "/api/" + Config.username + "/lights";
   }
   fetchData() {
      let url = this.getUrlWithUsername();

      fetch(url)
         .then(response => {
            if (!response.ok) {
              throw Error("Network request failed")
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

   changeState(id,state) {
      let on = false;
      if (state === 'on') {
         on = true;
      }
      let bodyData = '{"on":' + on + '}';
      fetch('http://192.168.1.232/api/5UeqXqaPUu-0O0oB22vLFRu5Xc680wInaIVvNo2M/lights/' + id + '/state',
            { method: 'PUT', body: bodyData })
         .then(response => {
            if (!response.ok) {
            throw Error("Network request failed")
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

   onClick(id, currentState) {
      let newState = 'on' 
      if (currentState === 'on') {
         newState = 'off';
      } 

      this.changeState(id,newState);
   }

   render() {
      if (this.requestFailed) {
         let url = this.getUrlWithUsername();
         return <p>Could not fetch from {url}</p>
      }

      if (!this.data) {
         return <p>Loading...</p>
      }

      console.log(this.data["1"]);
      let data = this.data;
      let lightItems = [];
      let clickHandler = this.onClick;
      Object.keys(data).forEach(function(id,index) {
         let item = data[id];
         let state = 'off';
         if (item.state.on === true) {
            state = 'on';
         }
            let light = <LightItem key={id} id={id} name={data[id].name} 
            state={state} onClick={clickHandler}/>
            lightItems.push(light);
         });
         return (
            <div>
               <table align="center">
               <tbody>
               {lightItems}
               </tbody>
               </table>
            </div>
         );
   }
}

export default LightsView
