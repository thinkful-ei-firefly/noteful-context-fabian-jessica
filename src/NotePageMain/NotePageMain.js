import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import UserContext from '../UserContext'

class NotePageMain extends React.Component {
  static contextType = UserContext;

  render(){
    const {folders, notes} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId);

    return (note ? 
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
      </section> : <div>Loading..</div>
    )
  }
  
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

export default NotePageMain;