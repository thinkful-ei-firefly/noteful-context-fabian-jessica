import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import {getNotesForFolder} from '../notes-helpers';
import UserContext from '../UserContext';

class NoteListMain extends React.Component {
  static contextType = UserContext;

  render(){
    const {notes} = this.context;
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder(
        notes,
        folderId
    );
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note {...this.props}
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
  
}

NoteListMain.defaultProps = {
  notes: [],
}

export default NoteListMain;