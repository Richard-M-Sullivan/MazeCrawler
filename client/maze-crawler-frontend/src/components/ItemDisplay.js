import React from 'react';

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