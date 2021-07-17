import React, { useState } from 'react'
import './index.css';
import Theme1 from "./components/Theme1"
import Theme2 from "./components/Theme2"
// import qs from 'qs'
// import PasteClient from "pastebin-api";





function Maincomp() {

    // const client = new PasteClient("5AeqRvywRybXN9p0ETLJqWL_1i5Ff_w4");
    const [switchview, setSwitchview] = useState(true)

    
        
    // const shareCode = async () => {
    //     const url = await client.createPaste({
    //         code: "const something = 'Hello World!'",
    //         expireDate: "N",
    //         format: "javascript",
    //         name: "something.js",
    //         publicity: 0,
    //       });

    //       console.log(url);
    // }

    

    return switchview ? (
        <React.Fragment>
            
            <div className="center" >
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
            </div>
         
            <Theme2 />
        </React.Fragment>)
        :(
        <React.Fragment>
            <div className="center">
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
            </div>
            <Theme1/>
        </React.Fragment>
    )

}

export default Maincomp
