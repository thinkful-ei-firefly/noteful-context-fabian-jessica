import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './NotePageNav.css'
import UserContext from '../UserContext';

class NotePageNav extends React.Component {
  constructor(props) {
    super(props)
    

    
    
  }
  static contextType = UserContext;
  
  
  render () {
    const {folders, notes} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )

  }
  
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}

export default NotePageNav