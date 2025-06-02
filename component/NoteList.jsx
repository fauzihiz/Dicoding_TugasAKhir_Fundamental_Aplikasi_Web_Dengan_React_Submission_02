import React from 'react';
import NoteCard from './NoteCard';
import { useLanguage } from '../src/contexts/LanguageContext';
import PropTypes from 'prop-types';

function NoteList({ notes, onDelete, onArchive, archived, onUnarchive }) {
  const { getText } = useLanguage();

  return (
    <div className="note-list-container">
      {notes.length > 0 ? (
        <div className="note-grid">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">
            {archived ? getText('emptyArchive') : getText('emptyNotes')}
          </p>
        </div>
      )}
    </div>
  );
}

// PropTypes untuk validasi props
NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteList;