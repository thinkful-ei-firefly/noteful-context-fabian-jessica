import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import UserContext from '../UserContext'

class NotePageMain extends React.Component {
  static contextType = UserContext;

  render(){
    console.log(this.context);
    const {folders, notes} = this.context;
    console.log(this.props.match);
    const {noteId} = this.props.match.params;
    console.log(noteId);
    const note = findNote(notes, noteId);
    console.log(note);

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
  
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

export default NotePageMain;