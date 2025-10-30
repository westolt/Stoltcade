import './user.css'
import guest from '../assets/guest.png'

const User = () => {
    return (
        <div className="user_box">
            <img className="picture" src={guest} alt="Guest image"></img>
            <p className='name'>Guest</p>
            <div className="stat_row">
                <span className='style'>Level:</span>
                <span className='stat'>?</span>
            </div>

            <div className="stat_row">
                <span className='style'>IQ:</span>
                <span className='stat'>?</span>
            </div>

            <div className="stat_row">
                <span className='style'>Skill:</span>
                <span className='stat'>?</span>
            </div>

            <div className="stat_row">
                <span className='style'>Luck:</span>
                <span className='stat'>?</span>
            </div>
                </div>
    )
}

export default User