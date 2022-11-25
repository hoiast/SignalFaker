# Backend

The Backend is a Node.js project built with [Koa.js](https://koajs.com/). It is served at port ```3001``` and provides fake data following the equation:

$$ y = -0.06366 + 0.12613cos({x\pi \over 500}) +0.12258cos({x\pi \over 250}) + 0.01593sin({x\pi \over 500}) + 0.03147sin({x\pi \over 250})$$

## Build Setup

```bash
# install dependencies
$ npm install

# serve using nodemon at localhost:3001
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

## Signal Data

It is possible to receive signal data via HTTP requests or WebSockets.
All signal data is sent as JSON objects with the following structure:

```json
{
  "time": 0,
  "signal": 0
}
```

#### Websocket

A websocket server is used to send realtime and continuous signal points to a client. It is served at port ```3001``` and connection attempts should use ```ws``` protocol. A typical websocket connection with this server is established as follows:

```javascript
const socket = new WebSocket('ws://localhost:3001');
```

The websocket server also responds to some messages. All messages should be sent as JSON. A typical communication is as follows:

```javascript
// Send a message to the server
socket.send(
    JSON.stringify(
        {
            type: 'start',
        }
    )
);
```

The following messages are supported:

- ```start``` - Request the server to starts sending signals.
    ```json
    {
        "type": "start"
    }
    ```

- ```stop``` - Request the server to stops sending signals.
    ```json
    {
        "type": "stop"
    }
    ```
- ```restart``` - Request the server data faker to resets its clock and starts sending signals. 
    ```json
    {
        "type": "restart"
    }
    ```
- ```setInterval``` - Request the server data faker to sets the interval between signals in a continuos flow.
    ```json
    {
        "type": "setInterval",
        "payload": {
            "interval": 100
        }
    }
    ```

#### API Endpoints

An API endpoint is also available to provide fake signals to a client. It is also served at port ```3001```, but connection attempts should use ```http``` protocol, instead of ```ws```. 

> GET: /api/signal 
> 
> __Query Params__:
> - time: number >= 0
>     If time is negative, invalid or not provided,
>     the server will return a signal using a its
>     clock.
> 
> __Response__:
> - status: 200
> - body: Signal format in JSON

A typical request using [Axios](https://axios-http.com/), for example, is as follows:

```javascript
axios
    .get('http://localhost:3001/api/signal')
    .then(response => {
        const signalData = response.data;
        // Do something with the signal data
    })
```





