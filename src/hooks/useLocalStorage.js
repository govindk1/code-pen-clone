import {React, useState, useEffect} from 'react'



const PREFIX = 'codepen-clone'

//This function is used for saving our html, css, js content on local storage
function useLocalStorage(key, initialValue) {

    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === 'function') {
        return initialValue()
        } else {
        return initialValue 
        }
    })

    useEffect(() => {
        //It will initiate the 3 key each key will save html, css, js content respectively 
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}

export default useLocalStorage
