import React, {useState,useEffect} from 'react';
import {Convert} from 'mongo-image-converter';
import axios from 'axios'


function Upload4() {
        const [imageFile, setImageFile] = useState('');
        const [files, setFiles] = useState('')

        useEffect(() => {
          axios.get('http://localhost:3004/image').then(res => {
            setFiles(res.data)
            console.log(res.data);
          })
        }, [])
        

            const convertImage = async (event) => {
            try {
                    const convertedImage = await Convert(imageFile)
                    if( convertedImage ){
                            console.log(convertedImage);
                            axios.post('http://localhost:3004/image',{body: convertedImage},
                            {headers: {
                              'Content-type': 'application/json; charset=UTF-8',
                            }}).then(res=>console.log("file uploaded successfully"))
                            // after this pass it to the backend using your fav API,
                    } else{
                            console.log('The file is not in format of image/jpeg or image/png')
                     }
                    }       
            catch (error) {
                    console.warn(error.message)
                    }
                    }
    
        return(
            <>
        <input type = 'file' onChange = {(e) => setImageFile( e.target.files[0] ) } />
        <button onClick = { convertImage } > Submit </ button>

        {files && files.map(item => {
            return(
                <img style={{"width":"30%"}} src={item.body} />
            )
        })}
        </>
    )}

    export default Upload4;