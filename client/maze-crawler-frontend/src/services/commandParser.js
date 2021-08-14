
// the command parser will have the state loaded or not loaded. This means that it has or doesn't have a
// tree of commands. To check if it is loaded or not you will need to call the loaded function.

// To load the tree you have to use the load command. This will require you to add a file, and the result will
// be that the data-structure is built and saved for use.

// Once the tree is loaded you can use the parse command function. This will take in a command and will return an
// dictionary of [{action:"action", noun:"noun"},{action:"action",noun:"noun"} ...]; this could be an array that is
// one item long or any number of items long. if there are no things to be returned, then it will return null.

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
        
        curr["*"] = command;
    }

    //this will take in a string and will return a list of command tuples, that will have an [{action:"action", subject:"subject"}]
    parseString(sentence){
        // create containers to hold actions and subjects
        let keyWords = [];
        //split the sentence into words, and iterate through each word
        sentence.split(" ").forEach(word=>{
            console.log(word);
            //for each word start at the base of the command tree
            let curr = this.root;
            let badWord = false;
            //then split the word and iterate through each letter
            word.split("").forEach(letter=>{
                //if the command tree has the letter at that point, then go deeper into the tree
                if(Object.prototype.hasOwnProperty.call(curr,letter)){
                    curr = curr[letter];
                }
                //if we know it is not a word then do nothing
                else if (badWord == true){

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

        let commands = [];
        let action = null;
        let subject = null;

        for (let index = 0; index < keyWords.length; index++) {
            const element = keyWords[index];



            console.log(element);

            if(Object.prototype.hasOwnProperty.call(element,"action")){
                action = element;
            }
            else{
                subject = element;
                
                if(action !== null && subject !== null){
                    commands.push([action,subject]);
                    
                }
            }
            
        }

        console.log(commands);
    }

}

function main(){
    const commandParser = new CommandParser;

    console.log(commandParser.getRoot());

    let commandList = [["run",{action:"MOVE"}],["walk",{action:"MOVE"}],["north",{location:"NORTH"}],["east",{location:"EAST"}],["south",{location:"SOUTH"}],["west",{location:"WEST"}]];

    commandList.forEach(command=>commandParser.addCommand(...command));

    console.log(JSON.stringify(commandParser.getRoot()));
    //console.log(JSON.stringify(commandParser.getRoot(),null,2));

    commandParser.parseString("i walk to the north the east and south then i run walk run to the east");

    let rootString = commandParser.getRootString();

    console.log(rootString);

    const newCommandParser = new CommandParser;

    console.log(newCommandParser.getRoot());

    newCommandParser.setRootFromString(rootString);

    newCommandParser.parseString("i walk to the north the east and south then i run walk run to the east");

}

main();