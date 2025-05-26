// src/pages/NoteDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import { Link } from 'react-router-dom';
import Nav from '../../component/Nav';
import PropTypes from 'prop-types';

function NoteDetail ({ notes }) {
  const { id } = useParams();
  const note = notes.find(n => n.id.toString() === id);

  if (!note) return <p>Catatan tidak ditemukan</p>;

  return (
    <div id='noteDetail'>
      <Link to='/home'>
              <h1>Personal Notes</h1>
      </Link>
      <Nav />
      <h2>{note.title}</h2>
      <small>{showFormattedDate(note.createdAt)}</small>
      <p>{note.body}</p>
    </div>
  )
};

NoteDetail.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoteDetail;