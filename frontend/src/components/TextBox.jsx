import './textbox.css'

const Textbox = ({ message }) => {

    return(
        <div className='box'>
            <p className='text'>{ message }</p>
        </div>
    )
}

export default Textbox