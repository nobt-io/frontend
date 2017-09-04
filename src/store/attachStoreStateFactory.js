export default function(store) {
  return function attachStoreState(data, existingCallback = (data) => data) {
    data.extra.state = store.getState();
    return existingCallback(data);
  }
}
