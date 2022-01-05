# Charts

## Task Requirements
Create a Single page web application using Vue (version 2).

*Details.* The app should use routing, at least 2 routes must be implemented. One of the routes
should be a page containing dashboards with charts. On the page with the dashboards, a user
should be able to display 1-4 charts. Moreover, it should be possible to filter the charts by dates
and to display them accordingly.

The second route may contain the implementation of other parts of the functionality at your
discretion.

UI must be responsive. You should use Vuetify.

Each chart should be configurable:
- Type of the chart: line or bar
- Line/Fill colour

The data for the charts could be either randomly generated or fetched via any public API.

*Example.* There are N sensors, some of them measure temperature, some - humidity, some -
light. It should be possible to display the data on different charts. At the same time, the app
should be able to combine the data from several sensors. For instance, it could get the
temperature from 2 sensors, humidity from another one, so that all the aggregated data would
be displayed on 1 chart.

Libraries that could be used:
- Vuetify
- Nuxt.js
- Vuex ORM
- Highcharts

## Usage

```
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

Run Node.js application: https://github.com/lena-gol/charts-api.

## Live demo
https://charts.aurula.tech
