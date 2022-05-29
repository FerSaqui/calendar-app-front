import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Fernando</span>
        <form className="text-end">
          <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span className="text-white"> Salir</span>
          </button>
        </form>
      </div>
    </nav>
  );
};
