
// the command parser will have the state loaded or not loaded. This means that it has or doesn't have a
// tree of commands. To check if it is loaded or not you will need to call the loaded function.

// To load the tree you have to use the load command. This will require you to add a file, and the result will
// be that the data-structure is built and saved on the client side for use.

// Once the tree is loaded you can use the parse command function. This will take in a command and will return an
// array of commands => [command,command,command,...].
// commands look like this => a list containing two objects: the action, and the thing the action is done on =>
// [{action:"action", noun:"noun"},{action:"action",noun:"noun"}].
// the array of commands could range in length from 0 to an arbitrary size

// the way that the parser will work is that it will have a queue for actions. An action is essentially a command like
// move, take, drop, look... etc. It will have a queue for nouns. A noun is the thing that is passed to the command
// so that the action knows what to act on. It will have a field for whether or not a tree is loaded. It will also
// have a mutable tree data-structure that will keep track of all the keywords that are commands. This tree structure
// will be able to be created from scratch, have items removed, have items edited, have items added, and be able to 
// parse commands. 

class CommandParser{
    //initialize the empty tree
    constructor(){
        this.root = {};
    }
    //get the tree from the starting point
    getRoot(){
        return this.root;
    }

    // this generates a json string that contains the tree information
    getRootString(){
        return JSON.stringify(this.root);
    }

    // this saves a provided tree in the data structure and sets the root to the base.
    setRootFromString(rootString){
        this.root = JSON.parse(rootString);
    }

    //this allows you to add commands to the tree in the format ("word",{commandType:commandName});
    addCommand(word,command){
        // initialize the current place in the dictionary as the root
        let curr = this.root;

        // for each letter in the word
        word.split("").forEach(letter=>{
            //if the current object has a key that is equal to the letter in the word
            if(Object.prototype.hasOwnProperty.call(curr,letter) === true){
                //set curr to the child of the key equal to letter
                curr = curr[letter];
            }
            //if the current object does not have a qey equal to the letter in the word
            else{
                // add the key letter that contains an empty object
                curr[letter] = {};
                curr = curr[letter];
            }
        });        
        
        // after the word is added, add a marker that lets the parser know that this is a command
        // then set the marker to map to the specified command.
        curr["*"] = command;
    }

    // this will take in a string and will return a list of command tuples, that will have an [{action:"action", subject:"subject"}]
    parseString(sentence){
        // create containers to hold actions and subjects
        let keyWords = [];
        //split the sentence into words, and iterate through each word
        sentence.split(" ").forEach(word=>{
            console.log(word);
            //for each word start at the base of the command tree
            let curr = this.root;

            // this is a flag that lets me know if the word that we are looking for is actually in the tree or not
            // (this is because the forEach() construct does not allow you to break, so this flag will let me know that
            // we no longer need to check things, but just iterate through the rest of the word doing nothing. - why did
            // I use forEach? because it is cool functional javascript voodoo magic. Cool points out weigh a loss in performance ;) )
            let badWord = false;

            //then split the word and iterate through each letter
            word.split("").forEach(letter=>{
                //if the command tree has the letter at that point, then go deeper into the tree
                if(Object.prototype.hasOwnProperty.call(curr,letter)){
                    curr = curr[letter];
                }
                //if we know it is not a word then do nothing
                else if (badWord === true){

                }
                //if we discover that it is not a word set bad word flag to true
                else{
                    badWord = true;
                    curr = {};
                    console.log(`${word} not in tree`);
                }
            });
            //if we make it to a command, then we need to add it to the lists
            if(Object.prototype.hasOwnProperty.call(curr,"*")){
                //console.log(curr["*"]);
                curr = curr["*"];
                if(Object.prototype.hasOwnProperty.call(curr,"action")){
                    keyWords.push(curr);
                }
                else if(Object.prototype.hasOwnProperty.call(curr,"location")){
                    keyWords.push(curr);
                }
            }
        });

        // at this point all the keywords are in the list together, but the actions need to be paired with nouns to be a full command

        //create a list to hold commands and create two variables to hold an action and a subject
        let commands = [];
        let action = null;
        let subject = null;

        //iterate through the list of keywords
        for (let index = 0; index < keyWords.length; index++) {
            const element = keyWords[index];

            console.log(element);

            //for each element sort and place them in their respective container
            // (when you put in an action you need to know what the subject is before you add the action and location pair
            // to the command list, so dont add to the command list when an action is added)
            if(Object.prototype.hasOwnProperty.call(element,"action")){
                action = element;
            }
            //if something other than an action is added, then you can add the action subject pair to the command list
            else{
                subject = element;
                
                //but only if you have already encountered an action for the subject to be attached to 
                if(action !== null && subject !== null){
                    commands.push([action,subject]);
                    
                }
            }
            
        }

        //console.log(commands);
        return commands;
    }

}

// this is just for testing. Be careful messing with this because it can have an effect on the applications that the parser is a part of
// as long as you don't call the function in this file then you should be good when running an application that imports the parser.
function main(){
    const commandParser = new CommandParser();

    console.log(commandParser.getRoot());

    let commandList = [["run",{action:"MOVE"}],["walk",{action:"MOVE"}],["north",{location:"NORTH"}],["east",{location:"EAST"}],["south",{location:"SOUTH"}],["west",{location:"WEST"}]];

    commandList.forEach(command=>commandParser.addCommand(...command));

    console.log(JSON.stringify(commandParser.getRoot()));
    console.log(JSON.stringify(commandParser.getRoot(),null,2));

    commandParser.parseString("i walk to the north the east and south then i run walk run to the east");

    let rootString = commandParser.getRootString();

    console.log(rootString);

    const newCommandParser = new CommandParser();

    console.log(newCommandParser.getRoot());

    newCommandParser.setRootFromString(rootString);

    newCommandParser.parseString("i walk to the north the east and south then i run walk run to the east");

}

// here we are setting some default values for testing the parser.
// eventually this will be added to the database and loaded by the client when they start the application

// this is a string that represents the command tree. and then we make a parser to put it in
const rootString = '{"r":{"u":{"n":{"*":{"action":"MOVE"}}}},"w":{"a":{"l":{"k":{"*":{"action":"MOVE"}}}},"e":{"s":{"t":{"*":{"location":"WEST"}}}}},"n":{"o":{"r":{"t":{"h":{"*":{"location":"NORTH"}}}}}},"e":{"a":{"s":{"t":{"*":{"location":"EAST"}}}}},"s":{"o":{"u":{"t":{"h":{"*":{"location":"SOUTH"}}}}}}}';
const parser = new CommandParser();

// create the parser from the root string
parser.setRootFromString(rootString);

// make sure this is commented out when not testing or it will run when you run the project

//main(parser);

export default parser;