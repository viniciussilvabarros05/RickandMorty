import { useState } from 'react'
import './App.css'
import style from './Global/style.module.scss'
import { Home } from './Home/Home'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Dashboard } from './Pages/Dashboar/Dash'
import { Episodes } from './Pages/Episodes/Episodes'
function App() {
  return (
    <div className="App"> 
      <div className={style.container}> 
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/episodes" element={<Episodes/>}/>
            <Route path="*" element={<Home/>}/> 
          </Routes>
        </Router> 
      </div>
    </div>
  )
}

export default App
