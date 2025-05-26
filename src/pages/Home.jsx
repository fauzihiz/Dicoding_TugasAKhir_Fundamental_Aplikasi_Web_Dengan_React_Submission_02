import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteList from '../../component/NoteList';
import { getActiveNotes, getNote } from '../utils/local-data';
import Nav from '../../component/Nav';
import Search from '../../component/Search';
import PropTypes from 'prop-types';


function Home ({ onDelete, onArchive, onUnarchive }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';

  const activeNotes = getActiveNotes()
    .filter((note) => !note.archived && note.title.toLowerCase().includes(keyword))
    .map((note) => getNote(note.id)); 
  
  const archived = false;

  return (
    <div>
      <Link to='/home'>
        <h1>Personal Notes</h1>
      </Link>
      <Nav />
      <Search />
      <h2>Catatan Aktif</h2>
        <ul> 
          <NoteList notes={activeNotes} onDelete={onDelete} onArchive={onArchive} archived={archived} onUnarchive={onUnarchive}/>
        </ul>
      </div>
  )
};

Home.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default Home;