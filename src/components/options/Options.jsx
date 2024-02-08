import { useId } from 'react'

import './options.scss'

export default function Options({ image, format, background, imageName, setImageName, setBackground }) {
    const imageNameInputId = useId()

    const showBackgroundOptions = !(/image\/(jpeg|bmp)/).test(image.type) && format === 'jpeg'
    
    return (
        <div className='options'>
            { 
                showBackgroundOptions &&
                <div className='options__bg-select'>
                    <p>Choose background</p>
                    <div className='options__bg-select-buttons'>
                        <button className='button' disabled={ background === 'light' } onClick={ () => setBackground('light') }>Light</button>
                        <button className='button' disabled={ background === 'dark' } onClick={ () => setBackground('dark') }>Dark</button>
                    </div>
                </div>
            }

            <div className='options__image-name-edit'>
                <label htmlFor={ imageNameInputId }>Edit name</label>
                <div className='options__input-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path></svg>
                    <input id={ imageNameInputId } type='text' value={ imageName } onChange={ e => setImageName(e.target.value) }/>
                    <span>.{format}</span>
                </div>
            </div>
        </div>
    )
}