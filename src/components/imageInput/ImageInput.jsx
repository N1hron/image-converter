import { useState, useId } from 'react'

import './imageInput.scss'

export default function ImageInput({ setImageFile, imageFile }) {
    const inputId = useId()

    function onChange(event) {
        const file = event.target.files[0]

        setImageFile(file)
    }

    return (
        <div className='image-input'>
            <input 
                id={ inputId }
                type='file' 
                accept='image/*'
                onChange={ onChange }
            />
            <label className='button button_dark' htmlFor={ inputId }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                    <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                </svg>
                Select image
            </label>
            { imageFile?.name && setImageName(imageFile.name) }
        </div>
    )
}

function setImageName(name) {
    let right = name.split('.').at(-1),
        left = name.split('.')[0]

    if (left.length > 13) {
        left = left.slice(0, 13) + '...'
    }
          
    return (
        <p className='image-input__image-name'>
            {left}<span>.{right}</span>
        </p>
    )
}