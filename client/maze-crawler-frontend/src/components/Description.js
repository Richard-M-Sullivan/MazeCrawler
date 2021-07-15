import React from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';
import SubmitBar from './SubmitBar';

export default function Description(props){

    const [descriptionData,setDescriptionData] = React.useState([
        {content:`You wake up in a forest. All around you hear the rustling of trees, and up ahead you hear falling water.
        You have a gash in your side and an empty canteen. What do you do, weary traveller?`},
        {content:"go foreward"},
        {content:`You make your way out of the forest up to the base of a craggy cliffs face. It towers over you, and from it 
        is the waterfall, which flows into a small pool of water. You look left. You look right. The cliffs face extends in 
        both directions as far as you can see, but to the right the forest pulls away from the face to expose a small headstone.`},
        {content:"go to the headstone and look around"},
        {content:"You reach the headstone"},
        {content:`Upon further inspection you find no name inscribed on its face. But there on top is a ceramic bowl of incense 
        that is still burning. Suddenly you get the feeling as though you are being watched.`}
    ]);
    
    const [descriptions,setDescriptions] = React.useState([]);

    const addDescription = function ({content}) {
        if(content != null){
            setDescriptionData([...descriptionData,{content:content}])
        }
    };

    React.useEffect(()=>{
        setDescriptions(
            descriptionData.map(({content},index)=>{
                return(
                    < React.Fragment key={index}>
                        <div className="padded">
                            {`${content}`}
                        </div>

                        <div className="width100 hasThinBorder"></div>
                    </ React.Fragment >
                );
            })
        );

    },[descriptionData]);

    return (
        <div className="description flexv">
            <div className="content hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Description</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <ReactScrollableFeed>{descriptions}</ReactScrollableFeed> 
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" submitAction={addDescription} name="descriptionSubmit"/>
        </div>
    );
}