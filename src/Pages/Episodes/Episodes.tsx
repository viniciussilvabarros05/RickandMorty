import { Card } from "../../components/card";
import styles from "../../Global/style.module.scss";
import style from "./Episodes.module.scss";
import { BsSearch } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../axios/axios";
import { DataProps } from "../../@types/data/data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Filter } from "../../components/filter";
export function Episodes() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<DataProps[]>([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [activeFilter, setActiveFilter] = useState(1);
  const [page, setPage] = useState(1);
  const dataFilters = [
    {
      id: 1,
      name: "Todos",
      filter: " ",
      filterBy: " ",
      img: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    },
    {
      id: 2,
      name: "Masculino",
      filter: "male",
      filterBy: "gender",
      img: "https://rickandmortyapi.com/api/character/avatar/135.jpeg",
    },
    {
      id: 3,
      name: "Feminino",
      filterBy: "gender",
      filter: "female",
      img: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    },
    {
      id: 4,
      name: "Vivo",
      filter: "alive",
      filterBy: "status",
      img: "https://www.zinecultural.com/Repositorio/Upload/S3/mlib-uploads/full/16061595791.webp",
    },
    {
      id: 5,
      name: "Morto",
      filter: "dead",
      filterBy: "status",
      img: "https://rickandmortyapi.com/api/character/avatar/56.jpeg",
    },
    {
      id: 6,
      name: "Desconhecido",
      filter: "unknow",
      filterBy: "gender",
      img: "https://rickandmortyapi.com/api/character/avatar/351.jpeg",
    },
  ];

  function HandleSearch(search: string, filter?: number) {
    setIsLoading(true);
    api
      .get(`/episode/${search}`, {
        params: {
          page: page,
          name: search,
        },
      })
      .then((response) => {
        if(!response.data.hasOwnProperty('results')){
          setData([response.data])
          setIsLoading(false) 
          return
        }
        setData(response?.data?.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setData([]);
      });
  }

  function loadMore() {
    setIsLoadingMore(true);
    setPage(page + 1);
    api
      .get("/episode", {
        params: {
          page: page + 1,
          name: search, 
        },
      })
      .then((response) => {
        setData([...data, ...response?.data?.results]);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingMore(false);
        setEmpty(true);
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
            to="/episodes"
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
          <h1>
            Episódios
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
              <h2 className={styles.alert}>Nenhum episódio encontrado</h2>
            ) : (
              <>
                <table>
                  <thead>
                    <th>Número</th>
                    <th>Nome</th>
                    <th>Data</th>
                  </thead>
                  <tbody>
                    {data?.map((character) => {
                      return (
                        <tr>
                          <td>{character?.id}</td>
                          <td>{character?.name}</td>
                          <td>{character?.air_date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
    
            <div className={style.footer}>
                {empty ? (
                ""
                ) : (
                <button className={styles.loadMore} onClick={loadMore}>
                    {isLoadingMore ? (
                    <div className={styles.loading}>
                        <AiOutlineLoading3Quarters
                        size={15}
                        color={"var(--green-300)"}
                        />
                    </div>
                    ) : (
                    "Carregar mais"
                    )}
                </button>
                )}
            </div>
        </main>
    
      </div>
    </div>
  );
}
