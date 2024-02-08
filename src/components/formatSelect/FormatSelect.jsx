import './formatSelect.scss'

const formats = [ 'Jpeg', 'Png', 'WebP' ]

export default function FormatSelect({ setFormat, selectedFormat }) {
    function createButtons() {
        return formats.map(format => (
            <button 
                disabled={ format.toLowerCase() === selectedFormat }
                className='button'
                onClick={ () => setFormat(format.toLowerCase()) }
                key={ format }
            >
                { format }
            </button>
        ))
    }

    return (
        <div className='format-select'>
            <p>Choose format</p>
            <div className='format-select__buttons'>
                { createButtons() }
            </div>
        </div>
    )
}