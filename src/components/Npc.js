"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
function Npc(props) {
    return (React.createElement(react_bootstrap_1.Container, null,
        React.createElement(react_bootstrap_1.Row, null,
            React.createElement(react_bootstrap_1.Col, null,
                React.createElement("h1", { className: "display-4" }, props.data.Name),
                React.createElement("div", null, props.npc.Monster ? props.data.Monster.Name : "None"),
                React.createElement(react_bootstrap_1.Button, { variant: "outline-info" }, "Details")),
            props.data.Picture &&
                React.createElement(react_bootstrap_1.Col, { style: { height: "100px" } },
                    React.createElement(react_bootstrap_1.Image, { src: "https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/" + props.data.Picture })))));
}
exports.default = Npc;
//# sourceMappingURL=Npc.js.map