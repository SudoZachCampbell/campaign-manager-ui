"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
function Character(props) {
    return (React.createElement("div", null,
        React.createElement("div", null,
            "Name: ",
            props.character["name"]),
        React.createElement("div", null,
            "Str: ",
            props.character["str"]),
        React.createElement("div", null,
            "Dex: ",
            props.character["dex"]),
        React.createElement("div", null,
            "Con: ",
            props.character["con"]),
        React.createElement("div", null,
            "Int: ",
            props.character["int"]),
        React.createElement("div", null,
            "Wis: ",
            props.character["wis"]),
        React.createElement("div", null,
            "Cha: ",
            props.character["cha"]),
        React.createElement(react_bootstrap_1.Button, { variant: "outline-info" }, "Details")));
}
exports.default = Character;
//# sourceMappingURL=Character.js.map