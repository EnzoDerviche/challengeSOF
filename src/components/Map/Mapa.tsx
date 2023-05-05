import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Backdrop, CircularProgress } from "@mui/material";
import ListCategories from "../FilterByCategories/ListCategories";
import FireInfo from "../FireInfo/FireInfo";
import ListFires from "../ListFires/ListFires";
import { Fire } from "../../types";
import L from "leaflet";
import FilterByDate from "../FilterByDate/FilterByDate";
import PolygonButton from "../Polygon/Polygon";
import "./mapa.css";

const typesFires: Record<number, string> = {
   10: "procesado",
   30: "procesado",
   11: "saturado",
   31: "saturado",
   12: "nubes",
   32: "nubes",
   13: "probAlta",
   33: "probAlta",
   14: "probMedia",
   34: "probMedia",
   15: "probBaja",
   35: "probBaja",
   20: "probBaja",
   50: "probMedia",
   90: "probAlta"
};

function changeIcon(type: number){
  const iconoBase = L.divIcon({
      className: `mapIcon ${typesFires[type]}`
  });
  return iconoBase
}

export function Mapa() {
  const [loading, setLoading] = useState<boolean>(true);
  const fires: Fire[] = useAppSelector((state) => state.fires.firesFiltered);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [fires]);

  return (
    <>
      <MapContainer
        center={[-32.941342, -60.712624]}
        zoom={3}
        minZoom={3}
        maxZoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <PolygonButton fires={fires}/>
        <MarkerClusterGroup showCoverageOnHover>
          {fires && fires.map((fire) => {
            return (
              <Marker position={[fire.y, fire.x]} icon={changeIcon(fire.conf)} key={`${fire.y}${fire.x}${fire.id}`}>
                <FireInfo fire={fire}/>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ListFires />
        <ListCategories />
        <FilterByDate />
      </MapContainer>
    </>
  );
}
