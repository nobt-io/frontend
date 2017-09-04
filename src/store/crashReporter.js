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

  next(action);
};
