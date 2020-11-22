/*helpers is used for global functions*/
/*show or hide some parts of components*/

const helpers = {

    charactersVisible: function(){
      document.getElementById('charactersList').style.display='block';
      //console.log("charactersVisible");
    },
    charactersHidden: function(){
      document.getElementById('charactersList').style.display='none';
      //console.log("charactersHidden");
    }
}

export default helpers;
