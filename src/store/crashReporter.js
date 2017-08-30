import AsyncActionStatus from "../const/AsyncActionStatus";

export const crashReporter = store => next => action => {

  if (!Raven || !Raven.isSetup()) {
    return next(action);
  }

  try {

    const {type, ...other} = {...action};

    Raven.captureBreadcrumb({
      category: "redux",
      message: type,
      data: {
        ...other
      }
    });

    if (other.payload && other.payload.status === AsyncActionStatus.FAILED) {
      Raven.captureMessage("Failed async action")
    }

    return next(action); // dispatch
  } catch (err) {

    Raven.captureException(err, { // send to crash reporting tool
      extra: {
        action,
        state: store.getState() // dump application state
      }
    });
    Raven.showReportDialog();

    throw err; // re-throw error
  }
};
