import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteList from '../../component/NoteList';
import { getArchivedNotes, getNote } from '../utils/local-data';
import Nav from '../../component/Nav';
import Search from '../../component/Search';
import PropTypes from 'prop-types';

function Arsip ({ onDelete, onArchive, onUnarchive }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';

  const archivedNotes = getArchivedNotes()
    .filter((note) => note.title.toLowerCase().includes(keyword))
    .map((note) => getNote(note.id)); 
  
  const archived = true;

  return (
    <div>
      <Link to='/home'>
        <h1>Personal Notes</h1>
      </Link>
      <Nav />
      <Search />
      <h2>Catatan Arsip</h2>
        <ul>
          <NoteList notes={archivedNotes} onDelete={onDelete} onArchive={onArchive} archived={archived} onUnarchive={onUnarchive}/>
        </ul>
      </div>
  )
};

Arsip.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default Arsip;