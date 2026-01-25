import React from "react";
import "./Grid.css";

const Grid = () => {
    return (<div className="grid-container">
        <div className="item" style={{ gridArea: "box1" }}>item 1</div>
        <div className="item" style={{ gridArea: "box2" }}>item 2</div>
        <div className="item" style={{ gridArea: "box3" }}>item 3</div>
        <div className="item" style={{ gridArea: "box4" }}>item 4</div>
        <div className="item" style={{ gridArea: "box5" }}>item 5</div>

    </div>)

}
export default Grid;