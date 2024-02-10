import { useState, useId } from 'react'

import './imageInput.scss'

export default function ImageInput({ setImageFile, imageFile }) {
    const inputId = useId()

    function onChange(event) {
        const input = event.target,
              file = input.files[0]
        
        if (file?.type.split('/')[0] === 'image') {
            setImageFile(file)
        } else {
            input.value = null
        }
    }

    const ext = imageFile?.name.split('.').at(-1),
          name = imageFile && cropFileName(imageFile.name.split('.').slice(0, -1).join('.'))

    return (
        <div className='image-input'>
            <input 
                id={ inputId }
                type='file' 
                accept='image/*, .jfif'
                onChange={ onChange }
            />
            <label className='button button_dark' htmlFor={ inputId }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                    <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                </svg>
                Select image
            </label>
            { 
                imageFile &&
                <p className='image-input__image-name'>
                    {name}<span>.{ext}</span>
                </p>
            }
        </div>
    )
}

function cropFileName(name) {
    if (name.length > 13) {
        return name.slice(0, 13) + '...'
    } else return name
}