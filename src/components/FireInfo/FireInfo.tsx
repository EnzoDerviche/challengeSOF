import { useState, useEffect } from "react";
import { Popup } from "react-leaflet";
import style from "./Info.module.css";
import { Fire } from "../../types";


interface Props {
    fire: Fire
};

export default function FireInfo({fire}: Props) {
    
    const [data, setData] = useState<Fire >()

    useEffect(() => {   
        setData(fire)
    },[fire])
  
    return (
    <Popup>
        <div className={style.contentInfo}>
          <h3>Informacion del foco de calor</h3>
          <p className={style.info}><b>Fecha: </b>{data && data.date.slice(0,10)}</p>
          <p className={style.info}><b>Hora: </b>{data && data.id.slice(11,19)}</p>
          <p className={style.info}><b>Coordenadas </b></p>
          <p className={style.info}><b>Lat: </b> {data && data.y}</p>
          <p className={style.info}><b>Lon: </b> {data && data.x}</p>
          <p className={style.info}><b>Satélite:</b> {data && data.sat}</p>
        </div>
    </Popup>
    );
};