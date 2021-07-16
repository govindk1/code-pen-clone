import React, { useState, useEffect } from 'react';
import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'
import qs from 'qs'
function App() {

  async function share() {
    const response = await fetch("https://pastebin.com/api/api_post.php", {
      method: 'POST',
      mode: 'no-cors',
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        api_dev_key: "-_minsBkoasDP6qBhWXypBF5fzbyGNFT",
        api_option: "paste",
        api_paste_code: "<h1>Dyte</h1>",
        api_paste_format:"html5"
      })
    }).then(response => console.log(response)).catch(err=>console.log(err))
    console.log(response)
  }

  share()

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
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
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
    </>
  )
}

export default App;