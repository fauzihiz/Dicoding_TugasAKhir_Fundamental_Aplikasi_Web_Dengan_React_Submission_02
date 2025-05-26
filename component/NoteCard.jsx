import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../src/utils/index';
import PropTypes from 'prop-types';

function NoteCard ({ note, onDelete, onArchive, onUnarchive }) {
  return (
    <div id='noteCard'>
      <Link to={"/note/" + note.id}>
        <h3>{note.title}</h3>
      </Link>
      <small>{showFormattedDate(note.createdAt)}</small>
      <p>{note.body}</p>
      <br />
      <button id='buttonHapus' onClick={() => onDelete(note.id)}>Hapus</button>
      <button id='buttonArsip' onClick={() => {note.archived ? onUnarchive(note.id) : onArchive(note.id)}}>
        {note.archived ? 'Kembalikan' : 'Arsipkan'}
      </button>
    </div>
  )
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteCard;