import { Card } from "../../components/card";
import styles from "../../Global/style.module.scss";
import style from "./dash.module.scss";
import { BsSearch } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import { DataProps } from "../../components/card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Filter } from "../../components/filter";
export function Dashboard() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataProps[]>([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(1);
  const dataFilters = [
    {
      id:1,
      name: "Todos",
      filter:" ",
      filterBy: " ",
      img: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    },
    {
      id:2,
      name: "Masculino",
      filter:"male",
      filterBy: "gender",
      img: "https://rickandmortyapi.com/api/character/avatar/135.jpeg",
    },
    {
      id:3,
      name: "Feminino",
      filterBy: "gender",
      filter:"female",
      img: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    },
    {
      id:4,
      name: "Vivo",
      filter: "alive",
      filterBy: "status",
      img: "https://www.zinecultural.com/Repositorio/Upload/S3/mlib-uploads/full/16061595791.webp",
    },
    {
      id:5,
      name: "Morto",
      filter:"dead",
      filterBy: "status",
      img: "https://rickandmortyapi.com/api/character/avatar/56.jpeg",
    },
    {
      id:6,
      name: "Desconhecido",
      filter:"unknow",
      filterBy: "gender",
      img: "https://rickandmortyapi.com/api/character/avatar/351.jpeg",
    },
  ];

  function HandleSearch(search: string, filter?:number) {
    let params: any = {};
    let currencyFilter = dataFilters.filter((filters)=> filters.id == filter) 
   
    if(activeFilter && !filter){
      currencyFilter = dataFilters.filter((filters)=> filters.id == activeFilter) 
      params[currencyFilter[0]?.filterBy] = currencyFilter[0]?.filter;
    }
   
    params[currencyFilter[0]?.filterBy] = currencyFilter[0]?.filter;
    params["name"] = search
   
    setIsLoading(true);
    api
      .get("/character", {
        params,
      })
      .then((response) => {
        setData(response?.data?.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
        setData([]);
      });

  }
  function send(event: any) {
    if (event.charCode === 13) {
      HandleSearch(event.target.value);
    }
  }

  useEffect(() => {
    HandleSearch("");
  }, []);

  return (
    <div className={style.container}>
      <header>
        <div className={style.search}>
          <input
            placeholder="Pesquisar no painel"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={send}
          ></input>
          <BsSearch color="#acacac" onClick={() => HandleSearch(search)} />
        </div>
      </header>
      <div className={style.contentMain}>
        <nav>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? style.activeLink : "")}
          >
            <div>
              <div className={style.children}>
                <BiHomeAlt size={24} color={"#ffffff"} />
              </div>
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink
            to="/episode"
            className={({ isActive }) => (isActive ? style.activeLink : "")}
          >
            <div>
              <div className={style.children}>
                <MdOutlineOndemandVideo size={24} color={"#ffffff"} />
              </div>
              <p>Episodes</p>
            </div>
          </NavLink>
          <NavLink to="/">
            <div>
              <div className={style.children}>
                <IoIosArrowRoundBack size={24} color={"#ffffff"} />
              </div>
              <p>Back</p>
            </div>
          </NavLink>
        </nav>

        <main>
          <Filter
            filterFunction={HandleSearch}
            dataFilters={dataFilters}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
          <h1>
            Personagens
            {isLoading && (
              <div className={styles.loading}>
                <AiOutlineLoading3Quarters
                  size={20}
                  color={"var(--green-300)"}
                />
              </div>
            )}
          </h1>
          <div className={style.card_list}>
            {isLoading ? (
              ""
            ) : data?.length == 0 ? (
              <h2 className={styles.alert}>Nenhum personagem encontrado</h2>
            ) : (
              <>
                {data?.map((character) => {
                  return <Card data={character} />;
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
