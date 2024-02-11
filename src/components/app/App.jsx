import { useState, useEffect } from 'react'

import ImageInput from '../imageInput/ImageInput'
import FormatSelect from '../formatSelect/FormatSelect'
import Options from '../options/Options'

import convertImage from '../../utils/convertImage'
import downloadImage from '../../utils/downloadImage'

import 'normalize.css'
import './app.scss'

export default function App() {
    const [imageFile, setImageFile] = useState(null),
          [format, setFormat] = useState(null),
          [background, setBackground] = useState('light'),
          [imageName, setImageName] = useState(null)


    useEffect(() => {
        setFormat(null)
        setBackground('light')
        
        if (imageFile) {
            setImageName(imageFile.name.split('.').slice(0, -1).join('.'))
        }
    }, [imageFile])

    function onDownloadButtonClick() {
        convertImage(imageFile, format, background).then((convertedImage) => {
            downloadImage(convertedImage, imageName, format)
        })
    }
    
    return (
        <>
            <main>
                <div className='converter'>
                    <ImageInput setImageFile={ setImageFile } imageFile={ imageFile } imageName={ imageName }/>
                    <FormatSelect setFormat={ setFormat } selectedFormat={ format } imageFile={ imageFile }/>
                    <Options 
                        imageFile={ imageFile } 
                        format={ format } 
                        background={ background } 
                        imageName={ imageName }
                        setImageName={ setImageName }
                        setBackground={ setBackground }
                    /> 
                    { imageFile && format && 

                    <button className='button button_dark' onClick={ onDownloadButtonClick }>
                        Download
                    </button> }
                </div>
            </main>
            <footer>
                <p>Made by <a href='https://github.com/N1hron' target='blank'>N1hron</a></p>
            </footer>
        </>
    )
}