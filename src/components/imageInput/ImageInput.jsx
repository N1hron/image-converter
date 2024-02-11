import { useRef, useId, useEffect } from 'react'

import './imageInput.scss'

export default function ImageInput({ setImageFile, imageFile }) {
    const inputId = useId(),
          dropareaRef = useRef(),
          inputRef = useRef()

    useEffect(() => {
        dropareaRef.addClass = function(className) {     
            if (!this.current.classList.contains(className)) {
                this.current.classList.add(className)
            }
        }
    }, [])

    function onChange(event) {
        const input = event.target,
              file = input.files[0]
        
        if (file?.type.includes('image')) {
            setImageFile(file)
        } else {
            input.value = null
        }
    }

    function onDragOver(event) {
        dropareaRef.current.classList.add('image-input__droparea_dragover')

        if (draggingImageFile(event)) {
            event.preventDefault()

            dropareaRef.addClass('image-input__droparea_dragover_valid')
        } else {
            dropareaRef.addClass('image-input__droparea_dragover_invalid')
        }
    }

    function onDragLeave() {
        dropareaRef.current.classList.remove(
            'image-input__droparea_dragover', 
            'image-input__droparea_dragover_valid', 
            'image-input__droparea_dragover_invalid'
        )
    }

    function onDrop(event) {
        if (draggingImageFile(event)) {
            event.preventDefault()
            const files = event.dataTransfer.files

            inputRef.current.files = files
            setImageFile(files[0])
        } 

        dropareaRef.current.classList.remove(
            'image-input__droparea_dragover', 
            'image-input__droparea_dragover_valid', 
            'image-input__droparea_dragover_imvalid'
        )
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
            <div 
                className='image-input__droparea' 
                ref={ dropareaRef }
                onDragOver={ onDragOver }
                onDragLeave={ onDragLeave }
                onDrop={ onDrop }
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                    <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                </svg>
                <p>Or drop it here</p>
            </div>
        </div>
    )
}

function draggingImageFile(event) {
    const item = event.dataTransfer.items[0]
    
    if (item?.kind === 'file' && item.type.includes('image')) {
        return true
    }

    console.log('Wrong file type!')
    return false
}

function cropFileName(name) {
    if (name.length > 13) {
        return name.slice(0, 13) + '...'
    } else return name
}