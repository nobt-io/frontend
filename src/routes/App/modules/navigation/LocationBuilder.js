import debug from "debug";

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.lastIndexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

export default class LocationBuilder {

  constructor(path, origin) {
    this._path = path;
    this._origin = origin;
  }

  /**
   * @returns {LocationBuilder}
   */
  static fromWindow() {
    return new LocationBuilder(window.location.pathname, window.location.origin)
  }

  /**
   * @param string
   * @returns {boolean}
   */
  endsWith(string) {
    return this._path.endsWith(string)
  }

  /**
   * @param part
   * @returns {LocationBuilder}
   */
  push(part) {

    let toAppend = part;

    if (!this.endsWith("/")) {
      toAppend = "/" + toAppend
    }

    this._path += toAppend;

    return this;
  }

  /**
   * @param numberOfPathElements
   * @returns {LocationBuilder}
   */
  pop(numberOfPathElements = 1) {

    let pathElements = this._path.split("/");
    pathElements.splice(-1, numberOfPathElements);

    let newPath = pathElements.join("/");

    debug(`Locations:removeParts(${numberOfPathElements})`)(`${this._path} -> ${newPath}`);

    this._path = newPath;

    return this;
  }

  /**
   * @param {Function} func
   */
  apply(func) {
    func(this._path)
  }

  get path() {
    return this._path;
  }

  get absolutePath() {
    return this._origin + this.path
  }
}
