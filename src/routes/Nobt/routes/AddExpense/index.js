import { injectReducer } from '../../../../store/reducers'
import debug from 'debug';

export default (store) => ({
  path: ':id/expenses/add',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {

    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AddExpense = require('./containers/AddExpenseContainer').default
      const reducer = require('./modules/AddExpense').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'AddExpense', reducer })

      /*  Return getComponent   */
      cb(null, AddExpense)

    /* Webpack named bundle   */
    }, 'AddExpense')
  }
})
