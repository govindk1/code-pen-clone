import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

//syntax highlighting for HTML OR XML
import 'codemirror/mode/xml/xml'

//syntax highlighting for Js
import 'codemirror/mode/javascript/javascript'

//syntax highlighting for CSS
import 'codemirror/mode/css/css'


import {Controlled as ControlledEditor} from 'react-codemirror2'
import GetAppIcon from '@material-ui/icons/GetApp';



function Editor(props) {

    //destructuring the props value
    const {
        language,
        displayName,
        value,
        onChange
      } = props


    function handleChange(editor, data, value){
        onChange(value)
    }

    //downloading file
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
    
      const downloadFile = (e) => {
      var k = (e.target.parentNode.getAttribute('id'))
      var k1
      try{
      k1 = (e.target.getAttribute('class').split(' '))[1]}
      catch{
        k1 = null
      }
      
      //checking for which file format and content we have to download
      if(k === "xml" || k1 ==="xml")
        download("index.html", JSON.parse(localStorage.getItem('codepen-clonehtml')).replace(/^"(.*)"$/, '$1'));
        
      else if(k === "css" || k1 === "css")
        download("index.css", JSON.parse(localStorage.getItem('codepen-clonecss')).replace(/^"(.*)"$/, '$1'));

      else if(k === "javascript" || k1 === "javascript"){
        download("index.js", JSON.parse(localStorage.getItem('codepen-clonejs')).replace(/^"(.*)"$/, '$1'));
      }
    
    }

    //Editor
    return props.show === "hidden" ?  (<h1></h1>) : (
        <div className = {"editor-container"} style={{visibility:props.show}}>
            <div className = "editor-title" id={language}   >
                <img src={props.photo} style={{height:"30px", width:"35px", borderRadius: "40%"}} alt=""></img>
                {displayName}
                <GetAppIcon className={language}  style={{color:"white", marginTop:"7px", cursor:"pointer"}} onClick={downloadFile}/>
            </div>
            <ControlledEditor 
                onBeforeChange={handleChange}
                value = {value}
                className = "code-mirror-wrapper"
                options = {{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers:true
                }}
                />
        </div>
    )
}

export default Editor
