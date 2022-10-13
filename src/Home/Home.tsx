import styles from '../Global/style.module.scss'
import style from './Home.module.scss'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
export function Home() {
    const navigate = useNavigate()
    return (

        <div className={style.content}>
            <img src={logo} />
            <button onClick={() => navigate("/dashboard")}>START</button>
        </div>

    )
}