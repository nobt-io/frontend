import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Landing = require('./containers/LandingContainer').default
      const reducer = require('./modules/Landing').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Landing', reducer })

      /*  Return getComponent   */
      cb(null, Landing)

    /* Webpack named bundle   */
    }, 'Landing')
  }
})
