import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: 'create(/:nobtName)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Create = require('./containers/CreateContainer').default
      const reducer = require('./modules/Create').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {key: 'Create', reducer})

      /*  Return getComponent   */
      cb(null, Create)

      /* Webpack named bundle   */
    }, 'Create')
  }
})
