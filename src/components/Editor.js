import React, {useState} from 'react'
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

    const {
        language,
        displayName,
        value,
        onChange
      } = props

    const [open, setOpen] = useState(true) 
    function handleChange(editor, data, value){
        onChange(value)
    }

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
      
      if(k === "xml" || k1 ==="xml")
        download("index.html", JSON.parse(localStorage.getItem('codepen-clonehtml')).replace(/^"(.*)"$/, '$1'));
        
      else if(k === "css" || k1 === "css")
        download("index.css", JSON.parse(localStorage.getItem('codepen-clonecss')).replace(/^"(.*)"$/, '$1'));

      else if(k === "javascript" || k1 === "javascript"){
        download("index.js", JSON.parse(localStorage.getItem('codepen-clonejs')).replace(/^"(.*)"$/, '$1'));
      }
    
    }

    
    function addColor(e) {
      e.target.style.color = '#63cdff';
    } 
    function removeColor(e) {
      e.target.style.color = 'white';
    }

    

    return props.show === "hidden" ?  (<h1></h1>) : (
        <div className = {`editor-container ${open ? '' : 'collapsed'}`} style={{visibility:props.show}}>
            <div className = "editor-title" id={language}   >
                {displayName}
                <GetAppIcon className={language} onMouseEnter={addColor} onMouseLeave={removeColor} style={{color:"white", marginTop:"7px"}} onClick={downloadFile}/>
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
