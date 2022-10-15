import { Dispatch } from "react";
import { DataProps } from "../../@types/data/data";
import style from "./modal.module.scss";
import styles from "../../Global/style.module.scss";
interface Props {
  data: DataProps | null;
  closeModal: Dispatch<DataProps | null>;
}
export function Modal({ data, closeModal }: Props) {
  function HandleCloseModal(event: any) {
    if (event?.target?.className === style.container) {
      closeModal(null);
    }
  }

  return (
    <div className={style.container} onClick={(e) => HandleCloseModal(e)}>
      <div className={style.modal}>
        <div className={style.contentImg}>
          <img src={data?.image} />
        </div>
        <div className={style.description}>
          <div>
            <h3>Nome</h3>
            <p>{data?.name}</p>
          </div>
          <div>
            <h3>Gênero</h3>
            <p>{data?.gender}</p>
          </div>
          <div>
            <h3>Status</h3>
            <p>{data?.status}</p>
          </div>
          <div>
            <h3>Espécie</h3>
            <p>{data?.species}</p>
          </div>

          <div>
            <h3>Origem</h3>
            <p>{data?.origin?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
