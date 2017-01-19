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

export default class Locations {

  constructor(path) {
    this._path = path
  }

  static fromReduxLocation(location) {
    return new Locations(location.pathname);
  }

  endsWith(string) {
    return this._path.endsWith(string)
  };

  addPart(part) {

    let toAppend = part;

    if (!this.endsWith("/")) {
      toAppend = "/" + toAppend
    }

    this._path += toAppend;

    return this;
  }

  removeParts(numberOfPathElements = 1) {

    let pathElements = this._path.split("/");
    pathElements.splice(-1, numberOfPathElements);

    let newPath = pathElements.join("/");

    debug(`Locations:removeParts(${numberOfPathElements})`)(`${this._path} -> ${newPath}`);

    this._path = newPath;

    return this;
  }

  get path() {
    return this._path;
  }
}
