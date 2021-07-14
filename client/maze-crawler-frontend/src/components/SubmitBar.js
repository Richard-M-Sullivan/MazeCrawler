import React, { useEffect } from 'react';

export default function SubmitBar(props){

    let placeholder = "input text";

    const submitHandler = function (e){
        console.log("form button pressed");
        props.submitAction({user:"richard",content:"hello"})
        e.preventDefault();
    }


    return(
        <form className={props.className} onSubmit={submitHandler} name={props.name}>
            <input className="width100 height100 inline noBackground noBorder bigFond" type="text" name="inputText" placeholder={placeholder} />
            <input className="inline hasBackground hasBorder hover" type="submit" value="Enter" />
        </form>
    );
}