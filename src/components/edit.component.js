// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
import helpers from './helpers';

export default class Edit extends Component {
  constructor(props) {
      super(props);
      this.onChangeCharacterName = this.onChangeCharacterName.bind(this);
      this.onChangeShortDescr = this.onChangeShortDescr.bind(this);
      this.onChangeLongDescr = this.onChangeLongDescr.bind(this);
      this.onChangeImg = this.onChangeImg.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.input = React.createRef();

      this.state = {
        error: null,
        isLoaded: false,
        name: '',
        shortDescription: '',
        description:'',
        image:'',
        file: '',
        imagePreviewUrl: ''
      }
  }

  /*api mount*/
  componentDidMount() {
    helpers.charactersHidden();
    axios.get("https://character-database.becode.xyz/characters/"+this.props.match.params.id)
      .then(
        (response) => {
                //console.log(JSON.stringify(response.data));
                this.setState({
                  name : response.data.name,
                  shortDescription : response.data.shortDescription,
                  description : response.data.description,
                  //image : response.data.image.substr(this.image.indexOf(',') + 1)
                  image : response.data.image,
                });
                //console.log(response.data.image);
            })
            .catch(function (error) {
                console.log(error);
            })
  }

  /*fct to setStage on change*/
  onChangeCharacterName(e) {
    this.setState({
      name: e.target.value
    });
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
    let output = document.getElementById('output-img');
    //console.log(output);
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

  /*fct submit + update the api */
  onSubmit(e) {
    e.preventDefault();
      /*check if image has been selected otherwise take the previous one*/
      if (!this.state.imagePreviewUrl) {
        this.state.imagePreviewUrl = this.state.image;
      }
      else {
        this.state.imagePreviewUrl = this.state.imagePreviewUrl;
      }
      /*check if no empty fieds*/
      if (this.state.name && this.state.shortDescription && this.state.description && this.state.imagePreviewUrl)
      {
        const obj = {
          name : this.state.name,
          shortDescription : this.state.shortDescription ,
          description : this.state.description,
          image : this.state.imagePreviewUrl.substr(this.state.imagePreviewUrl.indexOf(',') + 1)
        };
        axios.put('https://character-database.becode.xyz/characters/'+this.props.match.params.id, obj)
        .then(
        helpers.charactersVisible(),
        this.props.history.push("/")
          );
      }
      else {
        alert("No empty field allowed");
      }
}
  /*rendering content*/
  render() {
    return (
      <div style={{ marginTop: 10 }}>
          <h3>Edit Character</h3>
          <div className = "form-group text-right">
              <button type="button" className="btn btn-danger" to="/" onClick={(e) => { if (window.confirm('Do you want leave the character editing?')) this.props.history.push("/"); helpers.charactersVisible() } }>Cancel</button>
          </div>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label>Edit Character Name:</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" value={this.state.name} onChange={this.onChangeCharacterName} />
              </div>
              <div className="form-group">
                  <label>Edit Character Short Description:</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" value={this.state.shortDescription} onChange={this.onChangeShortDescr} />
              </div>
              <div className="form-group">
                  <label>Edit Character Long Description:</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.description} onChange={this.onChangeLongDescr} />
              </div>
              <div>
                  <label>Change picture</label>
                  <div className="grid-container-img-add">
                    <div className="file"><input className="form-control-file" type="file" name="image" id="UploadedFile" onChange={(e)=>this.onChangeImg(e)} /></div>
                    <div className="preview"><img id="output-img" className="output" alt="" src={`data:image/jpeg;base64,${this.state.image}`} /></div>
                  </div>
              </div>
              <div className = "form-group text-right">
                  <input type = "submit" value="Save edited character" className="btn btn-primary"/>

              </div>

          </form>
      </div>
    )
  }//\end rendering
}//\end Edit Class
