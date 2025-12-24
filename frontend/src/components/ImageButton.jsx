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
                <p>Click to change profile picture!</p>
            </span>
        </button>
    )
}

export default ImageButton