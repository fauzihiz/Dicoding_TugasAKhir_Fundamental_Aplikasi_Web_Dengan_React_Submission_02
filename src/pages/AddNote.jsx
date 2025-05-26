import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../../component/Nav';
import PropTypes from 'prop-types';

function AddNote({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: `notes-${+new Date()}`,
      title: title || '(untitled)',
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newNote);      
    setTitle('');        
    setBody('');
    navigate('/home');   
  };

  return (
    <div>
      <Link to='/home'>
        <h1>Personal Notes</h1>
      </Link>
      <Nav />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Isi catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
}

AddNote.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddNote;