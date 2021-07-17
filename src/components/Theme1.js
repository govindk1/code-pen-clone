import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import Bottompane from "./Bottompane"
import axios from "axios"


//importing images
import Xml from "../images/Xml.png" 
import Css from "../images/Css.png"
import Javascript from "../images/Javascript.jpg"

function App() {



  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          photo = {Xml}
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          photo = {Css}
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          photo = {Javascript}
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <Bottompane srcDoc={srcDoc}/>   
        </div>
    
    </>
  )
}

export default App;