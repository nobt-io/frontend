export const crashReporter = store => next => action => {

  if (!Raven || !Raven.isSetup()) {
    return next(action);
  }

  const {type, ...other} = {...action};

  Raven.captureBreadcrumb({
    category: "redux",
    message: type,
    data: {
      ...other
    }
  });

  Raven.context({
    extra: {
      action,
      state: store.getState() // dump application state
    }
  }, () => next(action));
};
