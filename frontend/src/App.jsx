import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom'
import Header from './components/Header'
import TextBox from './components/TextBox'
import Home from './pages/Home'
import Play from './pages/Play'
import './app.css'
import game1 from './assets/game1.png'
import game2 from './assets/game2.png'

const App = () => {
  const games = [
    { id: 1, name: 'Math Game', description: 'Do the math!', thumbnail: game1 },
    { id: 2, name: 'Rock, Paper, Scissors!', description: 'You already know how to play this game!', thumbnail: game2 }
  ]

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