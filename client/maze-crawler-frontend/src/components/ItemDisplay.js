import React from 'react';

// this is meant to be a display that shows the user the items that they currently have in
// their inventory

// so far this is unimplemented and will just show an empty list of items
export default function ItemDisplay (props){
    return(
        <div className=" itemDisplay hasBorder hasBackground flexv flexCenter">
            <h1>Items</h1>
            <div className="flexv flexLeft width100 overflowHidden">
                <div className="padded">content 1</div>
                <div className="width100 hasThinBorder noHeight"></div>
                <div className="padded">content 2</div>
                <div className="width100 hasThinBorder noHeight"></div>
                <div className="padded">content 3</div>
                <div className="width100 hasThinBorder noHeight"></div>
                <div className="padded">content 4</div>
            </div>
        </div>
    );
}