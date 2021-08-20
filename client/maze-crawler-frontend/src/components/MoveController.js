import React from 'react';

// eventually this will be a gui component that will allow the user to click buttons that will
// move the user in the NESW cardinal directions

// so far I am just making a container that is empty
export default function MoveController(props){
    return(
        <div className={props.className}>
            <div>
                move controller
            </div>
        </div>
    );
}