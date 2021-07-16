import React, {useState, useEffect} from "react"
import Editor from "./components/Editor"
import useLocalStorage from './hooks/useLocalStorage'


function App() {

    const [html, setHtml] = useLocalStorage('html', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [srcDoc, setSrcDoc] = useState('')

    const [viewpage, setViewpage] = useState({html:'visible', css:'hidden', js:'hidden'})

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
    <React.Fragment>
    {/* Top section */}


      <div className = "pane top-pane">

        {/*<!-- Side navigation -->*/}
        <div className="sidenav">
            <a  onClick={() => setViewpage({html:'visible', css:'hidden', js:'hidden'})}>index.html</a>
            <a  onClick={() => setViewpage({html:'hidden', css:'visible', js:'hidden'})}>index.css</a>
            <a  onClick={() => setViewpage({html:'hidden', css:'hidden', js:'visible'})}>index.js</a>
        </div>

        <div className="main pane">
            <Editor 
            language="xml" 
            displayName="HTML" 
            show = {viewpage.html}
            value={html} 
            onChange={setHtml}/>

            <Editor 
                language="css" 
                displayName="CSS" 
                show = {viewpage.css}
                value={css} 
                onChange={setCss}
            />
            <Editor 

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
        <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
        />
    </div>
    </React.Fragment>
  );
}

export default App;
