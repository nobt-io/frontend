import React from "react";
import FontIcon from "react-toolbox/lib/font_icon";

const isPositive = (person) => person.amount > 0;

const verb = (props) => (
  <span className={props.className}>
    {isPositive(props.person) ? "gets" : "owes"}
  </span>
);
const preposition = (props) => (
  <span className={props.className}>
    {isPositive(props.person) ? "from" : "to"}
  </span>
);

const icon = (props) => (
  <FontIcon
    className={props.className}
    value={isPositive(props.person) ? "add_circle" : "remove_circle"} />
);

exports.Verb = verb;
exports.Preposition = preposition;
exports.Icon = icon;

// TODO: this should be React.PropTypes.instanceOf(Person) as soon as we have a Person class
var personPropType = React.PropTypes.shape({
  name: React.PropTypes.string,
  amount: React.PropTypes.number
}).isRequired;

verb.propTypes = {
  className: React.PropTypes.string,
  person: personPropType
};

verb.defaultProps = {
  className: ""
};

preposition.propTypes = {
  className: React.PropTypes.string,
  person: personPropType
};

preposition.defaultProps = {
  className: ""
};

icon.propTypes = {
  className: React.PropTypes.string,
  person: personPropType
};

icon.defaultProps = {
  className: ""
};
