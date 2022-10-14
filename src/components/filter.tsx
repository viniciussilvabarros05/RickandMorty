import { Dispatch } from "react";
import style from "./filter.module.scss";

interface dataFilters {
  id: number;
  img: string;
  name: string;
  filterBy: string;
  filter: string;
}
interface Props {
  dataFilters: dataFilters[];
  activeFilter: number;
  setActiveFilter: Dispatch<number>;
  filterFunction: (name: string, filter:number) => void;
}
export function Filter({
  dataFilters,
  activeFilter,
  setActiveFilter,
  filterFunction,
}: Props) {
  function handleActiveFunction(id: number) {
    setActiveFilter(id);
    filterFunction('', id); 
  }

  return (
    <div className={style.filters}>
      {dataFilters?.map((filter) => {
        return (
          <div
            onClick={() => handleActiveFunction(filter.id)}
            className={
              activeFilter == filter.id ? style.activeFilter : ""
            }
          >
            <img src={filter?.img} />
            <p>{filter?.name}</p>
          </div>
        );
      })}
    </div>
  );
}
