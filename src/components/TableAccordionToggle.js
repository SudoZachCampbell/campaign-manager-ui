"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
function TableAccordionToggle(props) {
    var decoratedOnClick = react_bootstrap_1.useAccordionToggle(props.eventKey, function () {
        props.customOnClick(props.eventKey);
    });
    return (React.createElement("tr", { onClick: decoratedOnClick, key: props.key }, props.children));
}
exports.default = TableAccordionToggle;
//# sourceMappingURL=TableAccordionToggle.js.map