const util = require('util');
const fs = require('fs');

const WriteFileAsync = util.promisify(fs.writefile);
const ReadFileAsync = util.promisify(fs.readFile);
//dependancy for random unique id
const uuidv1 = require('uuid/v1');

class notestore {
    read (){
        return ReadFileAsync('./db/db.json', 'utf8');
    }

    write (note){
        return WriteFileAsync('./db/db.json', JSON.stringify(note));
    }

    //gets notes and checks array, if none exists generate
    getnotes (){
        return this.read().then((notes) => {
            let ParsedNotes; 

            try {
                ParsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                ParsedNotes = []
            }
            return ParsedNotes;
        
        });
    }
    //adds notes with a unique id

    AddNote(note) {
        const {title,text} = note;

        if (!title || !text) {
            throw new Error("Invalid Title or Text");
        }
    
        const NewNote = {title, text, id: uuidv1()};

        //saves note and returns note db
        return this.getnotes()
        .then((notes) => [...notes, NewNote])
        .then((updatednotes) => this.write(updatednotes))
        .then(() => NewNote);

    }

    //removing note by id 
    RemoveNote(id) {
        return this.getnotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((FilteredNotes) => this.write(FilteredNotes));
    }
}

module.exports = new notestore();