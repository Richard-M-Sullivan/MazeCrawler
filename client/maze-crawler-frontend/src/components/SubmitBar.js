import React from 'react';

// The submit bar provides the user an input field that they can use to submit data to the server

// This works by creating a submit object that contains the user, if they are validated, and the content of the input field
// the obj looks like this {user:"user name", validated: (true or false), content:"whatever was typed in the box"}
// Then it calls the submit action function, which is passed in by the parent component of the submit bar that delegates
// what happens to the submit object.
export default function SubmitBar(props){

    // create a function that is called when the submit button is activated (clicked or enter button).
    const submitHandler = function (e){

        // if the user has typed in the text field, then...
        if(e.target.inputText.value !== ""){

            //run the submit action function of the parent component with the submit object as the input parameter
            props.submitAction({user:props.user,validated:props.validated,content:e.target.inputText.value})

            //then set the input field to an empty string to clear it
            e.target.inputText.value = "";
        }

        // this prevents the default behavior of refreshing the page after a form submission
        e.preventDefault();

    };


    // returns the ui component, which is a text field and an enter button
    return(
        <form className={props.className} onSubmit={submitHandler} name={props.name}>
            <input className="width100 height100 inline noBackground noBorder bigFont noOutline" type="text" name="inputText" placeholder="input text" />
            <input className="inline hasBackground noBorder hover noOutline" type="submit" value="send" />
        </form>
    );
}