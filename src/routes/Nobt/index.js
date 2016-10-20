import { injectReducer } from "store/reducers";

export default (store) => ({
  path: ':id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Nobt = require('./containers/NobtContainer').default
      const reducer = require('./modules').default

      /*  Add the reducer to the store on key 'Nobt'  */
      injectReducer(store, {key: 'Nobt', reducer})

      /*  Return getComponent   */
      cb(null, Nobt)

      /* Webpack named bundle   */
    }, 'Nobt')
  }
})
