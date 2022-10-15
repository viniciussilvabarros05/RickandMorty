import style from './card.module.scss'
import {DataProps} from '../@types/data/data'
import { Dispatch, useState } from 'react'
import { Modal } from './modal/modal';
interface Props {
    data: DataProps;
    setCharacter: Dispatch<DataProps>
}
export function Card({data, setCharacter}:Props){
    return(
        <>
            <div className={style.container} onClick={()=> setCharacter(data)}>
                <div className={style.contentImage}> 
                    <img src={data?.image}/>
                </div>
                <div>
                    <h2>{data?.name}</h2>
                    <p>{data?.species}</p>
                </div>
            </div>
        </>
    )
}