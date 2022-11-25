# Frontend

The Frontend is a Nuxt.js project. It is a server-side rendered Vue.js application. Here it uses [WindiCSS](https://windicss.org/) for styling, [Axios](https://axios-http.com/) for API calling, [Chart.js](https://www.chartjs.org/) for rendering charts and [vue-chartjs](https://vue-chartjs.org/) to reactively update them.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Usage

The Frontend is a single page application. It is divided in two main sections with different data sources: API requests and Websockets.

#### Single API Requests

You may test the API endpoint manually using the input range to adjust the query parameter ```time``` or by directly clicking the _Consultar_ button. Toggle between these two modes by clicking _Manual_ or _Automático_ buttons.

<!-- Screenshot -->
<!-- MISSING LINK -->
[]()

#### Continuous Websocket Data

You may also test the websocket endpoint by clicking the _Iniciar_ button. This will request a continuos sequence of data from the backend server. All received data is automatically displayed in the chart. You may stop the data stream by clicking the _Parar_ button.

To adjust the frequency of the data stream, you may use the input range to pick a interval value and send it directly to the server. You may also limit how many points are displayed simultaneously in the chart by using the input range to pick a limit value.

It is possible to request data in intervals smaller than 20 milliseconds. However, the frontend application will not be able to display them all in sync with the data stream due performance issues in reactivity and chart rendering. 

<!-- Screenshot -->
<!-- MISSING LINK -->
[]()