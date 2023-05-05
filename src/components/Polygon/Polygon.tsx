import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFires, firesInPolygon } from '../../redux/fireSlice';
import {Fire} from "../../types";
import AccordionComponent from '../Accordion/Accordion';
import { Polygon, useMapEvents } from 'react-leaflet';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import Button from '@mui/material/Button';

import L from 'leaflet';
import style from "./PolygonButton.module.css"

interface Props {
  fires: Fire[]
}

  export default function PolygonButton({fires}: Props) {
  const dispatch = useAppDispatch();
  const firesTotal = useAppSelector(state => state.fires.firesFiltered);
  const [isDrawing, setIsDrawing] = useState(false);
  const [resetFires, setResetFires] = useState<Fire[]>([]);
  const [polygonPoints, setPolygonPoints] = useState<L.LatLngExpression[]>([]);

  const map = useMapEvents({
    click: (event) => {
      if (isDrawing) {
        const { latlng } = event;
        setPolygonPoints([...polygonPoints, latlng]);
      }
    },
  });

  const handlePolygonClick = () => {
    setResetFires(firesTotal);
    setIsDrawing(true);
    setPolygonPoints([]);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  };

  const handlePolygonFinish = () => {
    dispatch(setFires(resetFires));
    setIsDrawing(false);
    setPolygonPoints([]);
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  };

  useEffect(() => {
    if (polygonPoints.length === 3) {
      const bounds = L.latLngBounds(polygonPoints);
      const markersInPolygon = firesTotal.filter((fire) => {
        const point = L.latLng(fire.y, fire.x);
        return bounds.contains(point);
      });      
      dispatch(firesInPolygon(markersInPolygon));
      setIsDrawing(false);
    } 
  }, [polygonPoints]);

  return (
    <div className={style.content}>
      <AccordionComponent title={"Dibujar Poligono"} open="up">
        <div className={style.btnsContents}>
            <Button disabled={isDrawing ? true : false} variant="contained" color="success" onClick={handlePolygonClick} className={style.btn}>
                <PlayCircleFilledWhiteOutlinedIcon/> Dibujar 
            </Button>
            <Button variant="contained" color="error" onClick={handlePolygonFinish} className={style.btn}>
                <DeleteForeverOutlinedIcon/> Eliminar 
            </Button>
        </div>
      </AccordionComponent>
      <Polygon pathOptions={{ color: 'purple' }} positions={polygonPoints} />
    </div>
  );
};
