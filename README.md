# philips_hue_react_app
![CI](https://github.com/larsbergqvist/philips_hue_react_app/actions/workflows/ci.yml/badge.svg)

<p>
This is a simple ReactJS web application that shows how the Philips Hue API can be used for controlling Philips Hue lights.
<p>
Usage:<br>
Get the IP-address of your Philips Hue bridge and fetch a new username token (see https://developers.meethue.com/documentation/getting-started).<br>
Modify src/config.json with the IP address and the username: 
It should look somethins like (with example IP and a scrambled user name): <br>

```yaml
{
  "apiUrl": "http://192.168.1.17",
  "username": "KEtjVEVUf5LupVexQYPry8xXRddda"
}
```

Then run install and start: 
```
yarn install
yarn start
```
<p>

![Alt text](https://github.com/LarsBergqvist/philips_hue_react_app/blob/master/screenshot.png?raw=true "A ReactJS app for controlling Philips Hue lights")
