import React, {useState, useEffect} from "react"
import Editor from "../components/Editor"
import useLocalStorage from '../hooks/useLocalStorage'
import Bottompane from "./Bottompane"


//importing images
import Xml from "../images/Xml.png" 
import Css from "../images/Css.png"
import Javascript from "../images/Javascript.jpg"

function App() {

    const [html, setHtml] = useLocalStorage('html', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [srcDoc, setSrcDoc] = useState('')

    const [viewpage, setViewpage] = useState({html:'visible', css:'hidden', js:'hidden'})

   useEffect(() => {
    //Combining html, css, js content and putting on bottom pane which serve as live view
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
    //whenever our html, css, js content it will re-render bottom-pane
  }, [html, css, js])

  return (
    <React.Fragment>
    {/* Top section */}

        
      <div className = "pane top-pane">

        {/*<!-- Side navigation -->*/}
        <div className="sidenav">
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'visible', css:'hidden', js:'hidden', cursor:'pointer'})}>index.html</a>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'hidden', css:'visible', js:'hidden', cursor:'pointer'})}>index.css</a>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'hidden', css:'hidden', js:'visible', cursor:'pointer'})}>index.js</a>
            </div>
        </div>

        <div className="main pane">
            {/*passing props to the component*/}
            <Editor 
            photo = {Xml}
            language="xml" 
            displayName="HTML" 
            show = {viewpage.html}
            value={html} 
            onChange={setHtml}/>

            <Editor 
                photo = {Css}
                language="css" 
                displayName="CSS" 
                show = {viewpage.css}
                value={css} 
                onChange={setCss}
            />
            <Editor 
                photo = {Javascript}
                language="javascript" 
                displayName="JS" 
                show = {viewpage.js}
                value={js} 
                onChange={setJs}
            />
        </div>
        
    </div>

    {/* Bottom section */}
    <div className="pane">
        <Bottompane srcDoc={srcDoc}/>   
    </div>

    </React.Fragment>
  );
}

export default App;
