import React, { useState } from 'react'
import './index.css';
import App from './App.js'
import App1 from './App1.js'

function Maincomp() {

    const [switchview, setSwitchview] = useState(true)

    return switchview ? (
        <React.Fragment>
            <div className="center">
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
            </div>
            <App1 />
        </React.Fragment>
    ):(
        <React.Fragment>
            <div className="center">
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
            </div>
            <App/>
        </React.Fragment>
    )

}

export default Maincomp
