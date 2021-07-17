import React from 'react'

//loading code on iframe for live view
function Bottompane(props) {
    return (
        <iframe 
        srcDoc={props.srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
        />
    )
}

export default Bottompane
