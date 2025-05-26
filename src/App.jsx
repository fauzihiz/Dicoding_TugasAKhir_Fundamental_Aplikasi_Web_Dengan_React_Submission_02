import React, { useState } from 'react';
import { getAllNotes,
  editNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  addNote, } from '../src/utils/local-data';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import pages
import Home from './pages/Home';
import Arsip from './pages/Arsip';
import NoteDetail from './pages/NoteDetail';
import NotFound from './pages/NotFound';
import AddNote from './pages/AddNote';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App () {
  const [notes, setNotes] = useState(getAllNotes);

  const handleDelete = (id) => {
    deleteNote(id); 
    const updatedNotes = getAllNotes(); 
    setNotes(updatedNotes);
  };

  const handleArchive = (id) => {
    archiveNote(id); 
    const updatedNotes = getAllNotes(); 
    setNotes(updatedNotes);
  };

  const handleUnarchive = (id) => {
    unarchiveNote(id); 
    const updatedNotes = getAllNotes(); 
    setNotes(updatedNotes);
  };

  const onAdd = (note) => {
    addNote(note); 
    setNotes(getAllNotes()); 
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive}/>} />
          <Route path="/home" element={<Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive}/>} />
          <Route path="/note" element={<Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive}/>} />
          <Route path="/arsip" element={<Arsip onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive}/>} />
          <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
          <Route path="/add" element={<AddNote onAdd={onAdd}/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
export default App;