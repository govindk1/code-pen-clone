import React, { useState } from 'react'
import './index.css';
import Theme1 from "./components/Theme1"
import Theme2 from "./components/Theme2"
import ShareIcon from '@material-ui/icons/Share'
import axios from "axios"



function Maincomp() {

    const [switchview, setSwitchview] = useState(true)

    const share = async () => {
        try {
          const payload = {
            html: '<h1>Hello World</h1>',
            css: 'h1 { color: red; }',
            js: "document.h1.style.backgroundColor = 'green'"
          }
          const form = new FormData()
          form.append('api_dev_key', '5AeqRvywRybXN9p0ETLJqWL_1i5Ff_w4')
          form.append('api_option', 'paste')
          form.append('api_paste_code', JSON.stringify(payload))
          const res = await axios({
            method: 'post',
            url: '/api/api_post.php',
            data: form,
            headers: { 'Content-Type': 'multipart/form-data' }
          })
    
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }

  
    return switchview ? (
        <React.Fragment>
            
            <div className="center" >
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
                <ShareIcon style={{fontSize:"45px", marginLeft:"75%", marginRight:"2%", color:"#13b3ff", cursor:"pointer"}}
                            onClick={share}/>
            </div>
         
            <Theme2 />
            
        </React.Fragment>)
        :(
        <React.Fragment>
            <div className="center">
                <input type="checkbox" name="" value={switchview} onChange = {() => setSwitchview(value => !value)} />
                <ShareIcon style={{fontSize:"45px", marginLeft:"75%", marginRight:"2%", color:"#13b3ff", cursor:"pointer"}} onClick={share}/>
            </div>
            <Theme1/>
        </React.Fragment>
    )

}

export default Maincomp

