import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm bg-light fixed-top">
          <div className="container">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to='/' key='/'><img className="navbar-brand" width="42" src="images/logo-umpa-loompa.png" /></Link>
            <h4 className="mr-auto mt-auto">Oompa Loompa's Crew</h4>
          </div>
        </nav>  
      </header>
    );
  } 
}
