import React, { Component } from 'react';
import Light from './Light';

class Lights extends Component {
    constructor(props) {
        super(props);
        this.requestFailed = false;
        this.data = null;
        this.state = {
//            requestFailed: false
          newData : false
          }

          this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
      this.fetchData();
    }
    
    fetchData() {
        fetch('http://192.168.1.232/api/5UeqXqaPUu-0O0oB22vLFRu5Xc680wInaIVvNo2M/lights')
          .then(response => {
            if (!response.ok) {
              throw Error("Network request failed")
            }
    
            return response
          })
          .then(d => d.json())
          .then(d => {
            this.data = d;
            this.requestFailed = false;
            this.setState({newData:new Date()});
          }, () => {
            this.requestFailed = true;
          })
      }

      //    fetch('http://example.com/api/v1/registration/1', { method: 'PUT', body: formData })

      changeState(id,state) {
        let on = false;
        if (state === 'on') {
          on = true;
        }
        let bodyData = '{"on":' + on + '}';
        console.log(bodyData);
        fetch('http://192.168.1.232/api/5UeqXqaPUu-0O0oB22vLFRu5Xc680wInaIVvNo2M/lights/' + id + '/state',
        { method: 'PUT', body: bodyData })
          .then(response => {
            if (!response.ok) {
              throw Error("Network request failed")
            }
    
            return response
          })
          .then(d => d.json())
          .then(d => {
//            this.data = d;
            this.requestFailed = false;
            this.fetchData();
//            this.setState({newData:new Date()});
          }, () => {
            this.requestFailed = true;
          })
      }

      onClick(id, currentState) {
        console.log(id);
        console.log(currentState);
        let newState = 'on' 
        if (currentState === 'on') {
          newState = 'off';
//          this.data[id].state.on = false;
        } else {
          newState = 'on';
//          this.data[id].state.on = true;
        }

        this.changeState(id,newState);
      }

    render() {
            if (this.requestFailed) return <p>Failed!</p>
            if (!this.data) return <p>Loading...</p>
            console.log(this.data["1"]);
            let data = this.data;
            let buttons = [];
            let clickHandler = this.onClick;
            Object.keys(data).forEach(function(id,index) {
                console.log(id);
                console.log(data[id].name);
                let item = data[id];
                console.log(item.state.on);
                let state = 'off';
                if (item.state.on === true) {
                    state = 'on';
                }
//                let button = <button key={item.name}>{data[key].name} {state}</button>
                let button = <Light key={id} id={id} name={data[id].name} 
                state={state} onClick={clickHandler}></Light>
                buttons.push(button);
                // key: the name of the object key
                // index: the ordinal position of the key within the object 
            });
            return (
              <div>
                <div>
                  {buttons}
                </div>
              </div>
            )
    }
}

export default Lights
