// create.component.js

import React, { Component } from 'react';
import axios from 'axios';
import helpers from './helpers';

export default class Create extends Component {
  constructor(props) {
      super(props);
      this.onChangeCharacterName = this.onChangeCharacterName.bind(this);
      this.onChangeShortDescr = this.onChangeShortDescr.bind(this);
      this.onChangeLongDescr = this.onChangeLongDescr.bind(this);
      this.onChangeImg = this.onChangeImg.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          shortDescription: '',
          description:'',
          image:''
      }

      const { name } = this.state;
      const isEnabled =
      name.length > 0;
  }

  /*fct to setStage on change*/
  onChangeCharacterName(e) {
      this.setState({
        name: e.target.value
      })
  }
  onChangeShortDescr(e) {
    this.setState({
      shortDescription: e.target.value
    })
  }
  onChangeLongDescr(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeImg(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let output = document.getElementById('output');

    //base64 convert
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      //file preview
      output.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  /*hide characters block when mounting component*/
  componentDidMount() {
   helpers.charactersHidden();
  }

  /*fct submit + send to the api */
  onSubmit(e) {
    e.preventDefault();
    /*check if no empty fieds*/
    if (this.state.name && this.state.shortDescription && this.state.description && this.state.imagePreviewUrl)
    {
      const obj = {
            name : this.state.name,
            shortDescription : this.state.shortDescription,
            description : this.state.description,
            image : this.state.imagePreviewUrl.substr(this.state.imagePreviewUrl.indexOf(',') + 1)
          };
          axios.post('https://character-database.becode.xyz/characters/', obj)
              .then(
                helpers.charactersVisible(),
                this.props.history.push("/")
              );

      this.setState({
        name: '',
        shortDescription: '',
        description:'',
        image:'',
        show: ''
      })
    }
    else {
      alert("No empty field allowed");
    }
  }

/*rendering content*/
  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Add New Character</h3>
              <div className = "form-group text-right">
                  <button type="button" className="btn btn-danger" to="/" onClick={(e) => { if (window.confirm('Do you want leave the character adding?')) this.props.history.push("/"); helpers.charactersVisible() } }>Cancel</button>
              </div>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Add Character Name:</label>
                      <textarea  ref="nameCh" type="text" className="form-control" id="exampleFormControlTextarea1" rows="1" value={this.state.name} onChange={this.onChangeCharacterName}/>
                  </div>
                  <div className="form-group">
                      <label>Add Character Short Description:</label>
                      <textarea type="text" className="form-control" id="exampleFormControlTextarea1" rows="1" value={this.state.shortDescription} onChange={this.onChangeShortDescr}/>
                  </div>
                  <div className="form-group">
                      <label>Add Character Long Description:</label>
                      <textarea type="text" className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.description} onChange={this.onChangeLongDescr} />
                  </div>
                  <div>
                      <label>Add picture</label>
                      <div className="grid-container-img-add">
                        <div className="file"><input className="form-control-file" type="file" name="image" id="UploadedFile" onChange={(e)=>this.onChangeImg(e)} /></div>
                        <div className="preview"><img id="output" className="output" alt=""/></div>
                      </div>
                  </div>
                  <div className = "form-group text-right">
                      <input type = "submit" value="Save added character" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }//\end rendering
}//\endContent class
