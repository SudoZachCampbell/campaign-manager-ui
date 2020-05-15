"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var _ = require("lodash");
var Box_1 = require("@material-ui/core/Box");
var Collapse_1 = require("@material-ui/core/Collapse");
var IconButton_1 = require("@material-ui/core/IconButton");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Paper_1 = require("@material-ui/core/Paper");
var KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
var KeyboardArrowUp_1 = require("@material-ui/icons/KeyboardArrowUp");
function CollapsibleTable(props) {
    return (React.createElement(TableContainer_1.default, { component: Paper_1.default },
        React.createElement(Table_1.default, null,
            React.createElement(TableHead_1.default, null,
                React.createElement(TableRow_1.default, null, props.dataSet.headers.map(function (header) {
                    return React.createElement(TableCell_1.default, { key: header }, header);
                }))),
            React.createElement(TableBody_1.default, null, props.dataSet.data.map(function (instance) { return React.createElement(Row, { key: instance.Id, component: props.component, data: props.dataSet.data, instance: instance }); })))));
}
exports.default = CollapsibleTable;
function Row(props) {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, null,
                React.createElement(IconButton_1.default, { size: "small", onClick: function () { return setOpen(!open); } }, open ? React.createElement(KeyboardArrowUp_1.default, null) : React.createElement(KeyboardArrowDown_1.default, null))),
            _.mapValues(props.instance, function (instanceData) {
                console.log("Instance Data: ", instanceData);
                return React.createElement(TableCell_1.default, null, instanceData);
            })),
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { style: { paddingBottom: 0, paddingTop: 0 }, colSpan: Object.keys(props.instance).length },
                React.createElement(Collapse_1.default, { in: open, timeout: "auto", unmountOnExit: true },
                    React.createElement(Box_1.default, null, React.createElement(props.component, { id: props.instance.Id })))))));
}
//# sourceMappingURL=CollapsibleTable.js.map