import React from 'react';

// The submit bar provides the user an input field that they can use to submit data to the server

// This works by creating a submit object that contains the user (username: string), if they are validated (logged in: boolean),
// and the content of the input field(content: string).
// the obj looks like this {user:"user name", validated: (true or false), content:"whatever was typed in the box"}
// Then, it calls the submitAction function, which is passed in by the parent component of the submit bar that delegates
// what happens to the submit object.
export default function SubmitBar(props){

    // create a function that is called when the submit button is activated (clicked or enter button).
    // for this function the e is an object provided by the html form that the submit bar is made from.
    const submitHandler = function (e){

        // if the user has typed in the text field, then...
        if(e.target.inputText.value !== ""){

            // run the submit action function of the parent component with the submit object as the input parameter
            // (user and validated are provided from the parent component, while the content is provided from the submit-bar form)
            props.submitAction({user:props.user,validated:props.validated,content:e.target.inputText.value})

            //then set the input field to an empty string to clear it
            e.target.inputText.value = "";
        }

        // this prevents the default behavior of refreshing the page after a form submission
        // (in react refreshing the page restarts the app from scratch, so you'd lose all your info on the client side without this)
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