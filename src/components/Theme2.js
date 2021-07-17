import React, {useState, useEffect} from "react"
import Editor from "../components/Editor"
import useLocalStorage from '../hooks/useLocalStorage'
import Bottompane from "./Bottompane"
import GetAppIcon from '@material-ui/icons/GetApp';

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


  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  const downloadHtmlFile = (e) => {
  e.target.color="blue"
  download("index.html", JSON.parse(localStorage.getItem('codepen-clonehtml')).replace(/^"(.*)"$/, '$1'));

}

const downloadCssFile = () => {
    download("index.css", JSON.parse(localStorage.getItem('codepen-clonecss')).replace(/^"(.*)"$/, '$1'));
}

const downloadJsFile = () => {
    download("index.js", JSON.parse(localStorage.getItem('codepen-clonejs')).replace(/^"(.*)"$/, '$1'));
}

function addColor(e) {
  e.target.style.color = '#63cdff';
} 
function removeColor(e) {
  e.target.style.color = 'white';
}
  return (
    <React.Fragment>
    {/* Top section */}

        
      <div className = "pane top-pane">

        {/*<!-- Side navigation -->*/}
        <div className="sidenav">
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'visible', css:'hidden', js:'hidden'})}>index.html</a>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'hidden', css:'visible', js:'hidden'})}>index.css</a>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <a  onClick={() => setViewpage({html:'hidden', css:'hidden', js:'visible'})}>index.js</a>
            </div>
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
        <Bottompane srcDoc={srcDoc}/>   
    </div>

    </React.Fragment>
  );
}

export default App;
