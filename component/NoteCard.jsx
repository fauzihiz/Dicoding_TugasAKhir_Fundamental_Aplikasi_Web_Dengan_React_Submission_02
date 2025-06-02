import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../src/utils/index';
import { useLanguage } from '../src/contexts/LanguageContext';
import PropTypes from 'prop-types';

function NoteCard({ note, onDelete, onArchive, onUnarchive }) {
  const { getText } = useLanguage();

  return (
    <div className="note-card">
      <Link to={`/note/${note.id}`} className="note-title-link">
        <h3 className="note-title">{note.title}</h3>
      </Link>
      
      <small className="note-date">
        {showFormattedDate(note.createdAt)}
      </small>
      
      {/* Isi catatan (dipotong jika terlalu panjang) */}
      <p className="note-body">
        {note.body.length > 150 
          ? `${note.body.substring(0, 150)}...` 
          : note.body
        }
      </p>
      
      <div className="note-actions">
        <button 
          className="btn-delete" 
          onClick={() => onDelete(note.id)}
          title={getText('delete')}
        >
          {getText('delete')}
        </button>
        
        <button 
          className="btn-archive" 
          onClick={() => {
            note.archived ? onUnarchive(note.id) : onArchive(note.id)
          }}
          title={note.archived ? getText('unarchive') : getText('archive')}
        >
          {note.archived ? getText('unarchive') : getText('archive')}
        </button>
      </div>
    </div>
  );
}

// PropTypes untuk validasi props
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