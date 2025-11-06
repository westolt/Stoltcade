import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import gameService from './services/games'
import Header from './components/Header'
import TextBox from './components/TextBox'
import Home from './pages/Home'
import Play from './pages/Play'
import './app.css'

const App = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    console.log('Effect')
    gameService
      .getAll()
      .then(initalGames => {
        console.log('promise fulfilled')
        setGames(initalGames)
      })
  }, [])
  console.log('render', games.length, 'games')

  return (
      <Router>
        <div className='apps'>
          <Header />
          <Routes>
            <Route path='/' element={<Home games={games} />} />
            <Route path='/games/:id' element={<Play games={games} />} />
          </Routes>
          <TextBox />
        </div>
      </Router>
  )
}

export default App