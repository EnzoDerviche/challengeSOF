import React from "react";
import Checks from "./ChecksComponent";
import AccordionComponent from "../Accordion/Accordion";
import style from "./ListCategories.module.css";

export default function ListCategories() {
  return (
    <div className={style.categories}>
      <AccordionComponent title={"Filtros de Foco"} open="">
        <Checks />
      </AccordionComponent>
    </div>
  );
};
