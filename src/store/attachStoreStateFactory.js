export default function(store) {
  return function attachStoreState(data, originalCallback = (data) => data) {
    data.extra.state = store.getState();
    return originalCallback(data);
  }
}
