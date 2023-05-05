import React from "react";
import { useAppSelector } from "../../redux/hooks";
import AccordionComponent from "../Accordion/Accordion";
import ReactVirtualizedTable from "../Table/Table";
import style from "./ListFires.module.css";

export default function ListFires() {
    const { count } = useAppSelector((state) => state.fires);
    return (
        <div className={style.firesList}>
            <AccordionComponent title={`Mostrando ${count} incendios`} open="">
                <ReactVirtualizedTable />
            </AccordionComponent>
        </div>
    );
};