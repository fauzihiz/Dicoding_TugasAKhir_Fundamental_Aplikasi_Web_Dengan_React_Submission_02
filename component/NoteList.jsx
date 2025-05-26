import React from 'react';
import NoteCard from './NoteCard';
import PropTypes from 'prop-types';

function NoteList ({ notes, onDelete, onArchive, archived, onUnarchive }) {
  return (
    <div id='activeNote'>
      {notes.length ? (
        notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
          />
        ))
      ) : (
        <p>{archived ? 'Arsip Kosong' : 'Tidak ada catatan'}</p>
      )}
    </div>
  )
};

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