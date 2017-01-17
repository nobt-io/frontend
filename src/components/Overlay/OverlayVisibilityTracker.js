import Visibility from "../../const/Visibility";
import debug from "debug";

export default class OverlayVisibilityTracker {

  static log = debug("OverlayVisibilityTracker");

  constructor(name, push, goBack) {
    this.name = name;
    this.push = push;
    this.goBack = goBack;
  }

  show = () => {
    let currentHash = this.location.hash;
    let currentPath = this.location.pathname;

    this.push(currentPath + currentHash + this.name)
  };

  hide = () => {
    this.goBack()
  };

  updateLocation = (newLocation) => {
    this.location = newLocation
  };

  get visibility () {

    if (!this.location) {
      return Visibility.HIDDEN
    }

    let hash = this.location.hash;
    let endsWithName = hash.lastIndexOf(this.name) == hash.length - this.name.length;

    OverlayVisibilityTracker.log(`endsWithName: ${endsWithName}`);

    return endsWithName ? Visibility.VISIBLE : Visibility.HIDDEN;
  }
}
