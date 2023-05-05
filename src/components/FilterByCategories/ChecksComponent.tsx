import React from "react";
import { Checkbox } from "@mui/material";
import { changeFilters } from "../../redux/fireSlice";
import { useAppDispatch } from "../../redux/hooks";
import style from "./Checks.module.css";

export default function Checks() {
  const dispatch = useAppDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  interface Checkbox {
    name: string;
    color: string;
    filter: string
  }

  const typesCategories: Checkbox[] = [
    {
      name: "Procesado",
      color: "#771717",
      filter: "procesado"
    },
    {
      name: "Saturado",
      color: "#B71C1C",
      filter: "saturado"
    },
    {
      name: "Probabilidad alta",
      color: "#F44336",
      filter: "probAlta"
    },
    {
      name: "Probabilidad media",
      color: "#FF7800",
      filter: "probMedia"
    },
    {
      name: "Probabilidad baja",
      color: "#F6BF26",
      filter: "probBaja"
    },
    {
      name: "Contaminado por nubes",
      color: "#49454F",
      filter: "nubes"
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {    
    dispatch(changeFilters(e.target.id));
  };

  return (
    <div className={style.content}>
      {typesCategories.map((check) => {
        return (
          <div key={check.name}>
            <Checkbox
              {...label}
              onChange={handleChange}
              id={check.filter}
              defaultChecked
              sx={{
                color: check.color,
                "&.Mui-checked": {
                  color: check.color,
                },
              }}
            />
            <p className={style.name}>{check.name}</p>
          </div>
        );
      })}
    </div>
  );
}
