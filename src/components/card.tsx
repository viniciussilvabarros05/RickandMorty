import style from './card.module.scss'

export interface DataProps{
    id:number;
    name:string;
    status:string;
    species:string;
    gender: string;
    origin: {name:string, url:string};
    image: string;
    episode:string[];
}
interface Props {
    data: DataProps
}
export function Card({data}:Props){
    return(
        <div className={style.container}>
            <div className={style.contentImage}>
                <img src={data?.image}/>
            </div>
            <div>
                <h2>{data?.name}</h2>
                <p>{data?.species}</p>
            </div>
        </div>
    )
}