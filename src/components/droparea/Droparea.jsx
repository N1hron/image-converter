import { useState, useEffect, useMemo } from 'react'

import './droparea.scss'

export default function Droparea({ onClick, setImageFile }) {
    const [draggingStatus, setDraggingStatus] = useState(null)

    useEffect(() => {
        window.addEventListener('blur', () => setDraggingStatus(null))
    }, [])

    function onDrop(event) {
        event.preventDefault()

        const droppedItem = event.dataTransfer.items[0]

        if (isImageFile(droppedItem)) {
            setImageFile(event.dataTransfer.files[0])
        }

        setDraggingStatus(false)
    }

    function onDragOver(event) {
        event.preventDefault()

        const draggedItem = event.dataTransfer.items[0]

        if (isImageFile(draggedItem)) setDraggingStatus('valid')
        else setDraggingStatus('invalid')
    }

    const className = useMemo(() => {
        let className = 'droparea'
        
        switch (draggingStatus) {
            case 'valid':
                className += ' droparea_valid'
                break
            case 'invalid': 
                className += ' droparea_invalid'
                break
        }
        
        return className
    }, [draggingStatus])

    return (
        <div 
            className={ className }
            onDrop={ onDrop }
            onDragOverCapture={ onDragOver }
            onDragLeave={ () => setDraggingStatus(null)  }
            onClick={ onClick }
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
            <p>Or drop it here</p>
        </div>
    )
}

function isImageFile(item) {
    if (item?.kind === 'file' && item.type.includes('image')) {
        return true
    }

    return false
}