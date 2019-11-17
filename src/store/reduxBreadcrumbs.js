import * as Sentry from '@sentry/browser';

export const reduxBreadcrumbs = () => next => action => {
  const { type, ...other } = { ...action };

  Sentry.addBreadcrumb({
    category: 'redux',
    message: type,
    data: {
      ...other,
    },
  });

  next(action);
};
