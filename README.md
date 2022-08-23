# vue-starter

The structure of my usuals Vue projects
Webpack starter is on main, Vite on vite branch

![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/raphagoo/vue-starterv2)

Here is a more complete [description](./description.md).

## Main features

* Babel
* VueJS
* Webpack
* ESLint
* config file injection
* very light custom logger

## Quick start

```bash
# Clone this repo
git clone https://github.com/raphagoo/vue-starterv2.git vue-starterv2

# change directory to your app
cd vue-starterv2

# install the dependencies with npm
npm i

# start the server
npm start
```

Go to http://localhost:8080 in your browser.

Note you can change the port (see [devServe.port](https://webpack.js.org/configuration/dev-server/#devserverport) doc) in 3 ways:

* in the `scripts` section of the `package.json`

  ```json
  "start": "cross-env NODE_ENV=development webpack-dev-server --hot --port 9000"
  ```

* in `webpack.config.js`

  ```javascript
  module.exports = {
      //...
      devServer: {
          port: 9000
      }
  };
  
  ```
* directly in the CLI:

  ```bash
  npm start --port=9000
  ```

## Building the app

Just launch the following:

```bash
npm run build
```

By default, it uses the `config/production.js` file.
To use an alternate configuration, launch the following:

```bash
npm run build myServerConfig
```

## License

[MIT](./LICENCE)

## Logger

see comments in [src/interfaces/consoleLogger.js](./src/interfaces/consoleLogger.js)
