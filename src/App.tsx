import { useState } from 'react'
import styles from './App.module.scss'
import style from './Global/style.module.scss'
import { Home } from './Home/Home'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Dashboard } from './Pages/Dashboar/Dash'
function App() {
  return (
    <div className={styles.App}>
      <div className={style.container}> 
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router> 
      </div>
    </div>
  )
}

export default App
