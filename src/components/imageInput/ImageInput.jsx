import { useRef, useId } from 'react'

import Droparea from '../droparea/Droparea'

import './imageInput.scss'

export default function ImageInput({ setImageFile, imageFile }) {
    const inputId = useId(),
          inputRef = useRef()

    function onChange(event) {
        const input = event.target,
              file = input.files[0]
        
        if (file?.type.includes('image')) {
            setImageFile(file)
        } else {
            input.value = null
        }
    }

    const ext = imageFile?.name.split('.').at(-1),
          name = imageFile && cropFileName(imageFile.name.split('.').slice(0, -1).join('.'))

    return (
        <div className='image-input'>
            <div className='image-input__input'>
                <input 
                    id={ inputId }
                    ref={ inputRef }
                    type='file' 
                    accept='image/*, .jfif'
                    onChange={ onChange }
                />
                <label className='button button_dark' htmlFor={ inputId }>
                    Select image
                </label>
                <p className='image-input__image-name'>
                    { imageFile ? <>{name}<span>.{ext}</span></>: 'No file chosen' }
                </p>
            </div>
            <Droparea
                onClick={ () => inputRef.current.click() }
                setImageFile={ setImageFile }
            />
        </div>
    )
}

function cropFileName(name) {
    if (name.length > 13) {
        return name.slice(0, 13) + '...'
    } else return name
}