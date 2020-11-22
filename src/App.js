// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import logo from './images/deadpool-logo.png';
import axios from 'axios';
import helpers from './components/helpers';
import Routes from './Routes';
import ReactMarkdown from 'react-markdown';

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          characters  : [],
      };//\state
  }//\constructor

/*function to fetch the api*/
  getApi() {
    // Github fetch library : https://github.com/github/fetch
    // Call the API page
    fetch('https://character-database.becode.xyz/characters')
    .then(res => res.json())
    .then ((result) => {
      this.setState({
        characters: result
      });
    })
  }
/*api update*/
  componentDidUpdate() {
  this.getApi()
  }
/*api mount*/
  componentDidMount() {
    this.getApi()
  }
/*fct to delete characters*/
  deleteCharacter(e){
    console.log(e)
    axios.delete("https://character-database.becode.xyz/characters/" + e)
    .then(res => console.log(res.data));
  }
/*rendering content*/
  render() {
    const {characters} = this.state;
    return (
      <article className="container">
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} onClick={ () => helpers.charactersVisible() } className="navbar-brand">React Character Manager</Link>
              <Link to={'/create'}  onClick={ () => helpers.charactersHidden() } type="button" className="btn btn-primary">Add character</Link>

            </nav> <br/>
            <div className="header">
              <img src={logo} alt="Deadpool" className="logo"/>
            </div>
            <Routes/>
              <section id="charactersList">
              {characters.map(character =>
                <li
                    key = { character.id }
                    className = 'characters'
                >
                  <div className="grid-container">
                      <div className="picture">
                        <img src={`data:image/jpeg;base64,${character.image}`} alt={ character.name }/>
                      </div>
                      <div className="content">
                        <div className="charName">{ character.name }</div>
                        <div className="charDescr">{ character.shortDescription }</div>
                      </div>
                      <div className="buttons">
                      <Link className="btn btn-success" to={"/edit/" + character.id}>Edit</Link>
                      <button type="button" className="btn btn-danger" to="/" onClick={(e) => { if (window.confirm('You are about to delete a character... Sure?')) this.deleteCharacter(character.id) } }>Delete</button>
                      </div>
                  </div>
                  <div className="showmore">
                  <Collapsible trigger="Show more">
                    <ReactMarkdown source = { character.description } />
                  </Collapsible>
                  </div>
                </li>
                  )//\character
              }{/*\character.map*/}
              </section>
        </Router>
      </article>
    );
  }//\render
}//\class
