const ImageButton = ({ image, onClick }) => {

    return(
        <button
            className="image-button"
            onClick={onClick}
        >
            <img className="picture"
            src={image}
            alt="Profile picture"
            />
            <span className="overlay">
                <p style={{
                fontSize: '12px',
                color: 'white',
                fontFamily: '"Press Start 2P", cursive'
            }}>Click to change profile picture!</p>
            </span>
        </button>
    )
}

export default ImageButton