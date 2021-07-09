import React from 'react';
import SubmitBar from './SubmitBar';

export default function Chat(props){
    return (
        <div className="chat flexv">
            <div className="hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Chat</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <div className="padded">content 1 lkajdslfkjasldkfjas -Richard</div>
                    <div class="width100 hasThinBorder"></div>
                    <div className="padded">content 2 lkajdslflskadfjla skjdflaskjdflaskji flai kjldsf kjaskjas ldkfjas -Connor</div>
                    <div class="width100 hasThinBorder"></div>
                    <div className="padded">content 3 dslfkjasldkfjas -Makena</div>
                    <div class="width100 hasThinBorder"></div>
                    <div className="padded">content 4 llaskdjflaskjfdaskajdslfkjasldkfjas -David</div>
                    <div class="width100 hasThinBorder"></div>
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight" />
        </div>
    );
}