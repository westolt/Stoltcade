import Header from './components/Header'
import TextBox from './components/TextBox'
import User from './components/User'
import GameList from './components/GameList'
import './app.css'


const App = () => {
  return (
    <div className='apps'>
      <Header />
      <div className='middle'>
        <User />
        <div className='list'>
          <GameList />
        </div>
      </div>
      <TextBox />
    </div>
  )
}

export default App