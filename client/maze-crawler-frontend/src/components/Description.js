import React from 'react';

import SubmitBar from './SubmitBar';

export default function Description(props){
    return (
        <div className="description flexv">
            <div className="content hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Description</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <div className="padded">content 1 lkajdslfkjasldkfjas</div>
                    <div className="width100 hasThinBorder"></div>
                    <div className="padded">content 2 lkajdslflskadfjlaskjdflaskjdflaskjflakjldsfkjaskjasldkfjas</div>
                    <div className="width100 hasThinBorder"></div>
                    <div className="padded">content 3 dslfkjasldkfjas</div>
                    <div className="width100 hasThinBorder"></div>
                    <div className="padded">content 4 llaskdjflaskjfdaskajdslfkjasldkfjas</div>
                    <div className="width100 hasThinBorder"></div>
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" />
        </div>
    );
}