export interface DataProps{
    id:number;
    name:string;
    status:string;
    species:string;
    gender: string;
    origin: {name:string, url:string};
    image: string;
    episode:string[];
    air_date?:string;
}
