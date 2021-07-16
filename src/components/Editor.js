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

    

    return props.show == "hidden" ?  (<h1></h1>) : (
        <div className = {`editor-container ${open ? '' : 'collapsed'}`} style={{visibility:props.show}}>
            <div className="editor-title">
                {displayName}
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
