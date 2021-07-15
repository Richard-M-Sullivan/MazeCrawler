import React, { useEffect } from 'react';

export default function SubmitBar(props){

    let placeholder = "input text";

    const submitHandler = function (e){

        if(e.target.inputText.value !== ""){

            props.submitAction({user:"richard",content:e.target.inputText.value})
            e.target.inputText.value = "";
        }

        e.preventDefault();

    }


    return(
        <form className={props.className} onSubmit={submitHandler} name={props.name}>
            <input className="width100 height100 inline noBackground noBorder bigFont noOutline" type="text" name="inputText" placeholder={placeholder} />
            <input className="inline hasBackground noBorder hover noOutline" type="submit" value="send" />
        </form>
    );
}