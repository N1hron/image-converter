import { useState, useEffect } from 'react'

import ImageInput from '../imageInput/ImageInput'
import FormatSelect from '../formatSelect/FormatSelect'
import Options from '../options/Options'

import 'normalize.css'
import './app.scss'

export default function App() {
    const [image, setImage] = useState(null),
          [format, setFormat] = useState(null),
          [background, setBackground] = useState('light'),
          [imageName, setImageName] = useState(null)

    useEffect(() => {
        if (image) setImageName(image.name.split('.')[0])
    }, [image?.name])

    function onDownloadButtonClick() {
        console.log(image)
        console.log(format)
        console.log(background)
        console.log(imageName)
    }
    
    return (
        <>
            <main>
                <div className='converter'>
                    <ImageInput setImage={ setImage } image={ image }/>
                    { image && <FormatSelect setFormat={ setFormat } selectedFormat={ format }/> }
                    { 
                        image && format && 
                        <Options 
                            image={ image } 
                            format={ format } 
                            background={ background } 
                            imageName={ imageName }
                            setImageName={ setImageName }
                            setBackground={ setBackground }
                        /> 
                    }
                    { image && format && <button className='button button_dark' onClick={ onDownloadButtonClick }>Download</button> }
                </div>
            </main>
            <footer>
                <p>Made by <a href='https://github.com/N1hron' target='blank'>N1hron</a></p>
            </footer>
        </>
    )
}
