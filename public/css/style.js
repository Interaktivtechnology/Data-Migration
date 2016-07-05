import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "fontFamily": "Arial,Helvetica,sans-serif",
        "color": "#222"
    },
    "td": {
        "fontFamily": "Arial,Helvetica,sans-serif",
        "color": "#222",
        "fontSize": "75%",
        "display": "table-cell",
        "verticalAlign": "inherit"
    },
    "table-data th": {
        "backgroundColor": "#f9f9f9",
        "width": "45%"
    },
    "main-logo": {
        "float": "left",
        "height": 48,
        "marginRight": 8,
        "position": "relative",
        "top": -5
    },
    "dropdown-menu li": {
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0
    },
    "button": {
        "fontSize": "50%",
        "fontWeight": "bold"
    },
    "h1": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "h2": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "h3": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "h4": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "h5": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "h6": {
        "fontSize": "100%",
        "fontWeight": "bold"
    },
    "subtitle": {
        "color": "#888"
    },
    "mheading": {
        "width": "40%",
        "float": "left"
    },
    "mbuttons": {
        "width": "60%",
        "float": "left"
    },
    "divdata": {
        "borderBottom": "1px solid #ececec",
        "fontFamily": "Arial,Helvetica,sans-serif",
        "color": "#222",
        "fontSize": "85%",
        "width": "50%"
    },
    "tr th": {
        "borderBottom": "1px solid #e3deb8"
    },
    "tr td": {
        "borderBottom": "1px solid #e3deb8"
    },
    "divdata2": {
        "fontFamily": "Arial,Helvetica,sans-serif",
        "color": "#222",
        "fontSize": "85%",
        "width": "100%",
        "height": "100%"
    },
    "tdtlabel": {
        "fontWeight": "bold",
        "paddingRight": 10,
        "paddingLeft": ":2",
        "textAlign": "right",
        "float": "left",
        "display": "inline",
        "fontSize": "91%",
        "verticalAlign": "top"
    },
    "pbTitle": {
        "verticalAlign": "top",
        "fontSize": "91%",
        "width": "30%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "divpHeader": {
        "display": "block"
    },
    "tdtdata": {
        "textAlign": "left",
        "float": "left",
        "fontSize": "91%",
        "display": "inline",
        "verticalAlign": "top"
    },
    "col25": {
        "width": "25%"
    },
    "col50": {
        "width": "50%"
    },
    "col75": {
        "width": "75%"
    },
    "col100": {
        "width": "100%"
    },
    "tablesec": {
        "display": "table",
        "borderCollapse": "separate",
        "width": "100%",
        "backgroundColor": "#ffffff"
    },
    "tablelist": {
        "display": "table",
        "borderCollapse": "separate",
        "borderColor": "grey",
        "width": "100%",
        "backgroundColor": "#ffffff",
        "border": "1px solid #e0e3e5"
    },
    "trheaderRow th": {
        "background": "#f2f3f3",
        "color": "#000",
        "fontSize": "75%",
        "fontWeight": "bold",
        "paddingTop": 5,
        "paddingRight": 2,
        "paddingBottom": 4,
        "paddingLeft": 5
    },
    "trbodyRow td": {
        "color": "#000",
        "fontSize": "75%",
        "paddingTop": 5,
        "paddingRight": 2,
        "paddingBottom": 4,
        "paddingLeft": 5
    },
    "divbPageBlock": {
        "backgroundColor": "#f8f8f8",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "borderTop": "2px solid #e5c130",
        "borderLeft": "1px solid #e0e3e5",
        "borderRight": "1px solid #e0e3e5",
        "borderBottom": "1px solid #e0e3e5",
        "display": "block",
        "verticalAlign": "middle"
    },
    "divbPageBlock2": {
        "borderTop": "2px solid #e5c130",
        "verticalAlign": "middle"
    },
    "th": {
        "display": "table-cell",
        "verticalAlign": "inherit"
    },
    "txtlabel": {
        "fontWeight": "bold"
    }
});