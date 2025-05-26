import React from "react";
import { Link, useLocation } from "react-router-dom";


function Nav () {
  const location = useLocation();

  return (
    <div id="nav">
      <Link to='/note'>
        <h2>Catatan Aktif</h2>
      </Link>
      {location.pathname !== "/add" &&
      <Link to='/add'>
        <h2>Tambah Catatan</h2>
      </Link>
      }
      <Link to='/arsip'>
              <h2>Catatan Arsip</h2>
      </Link>
    </div>
  )
}

export default Nav;