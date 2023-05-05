import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { filterByDate } from "../../redux/fireSlice";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import AccordionComponent from "../Accordion/Accordion";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs'
import style from "./FilterByDate.module.css";

export default function FilterByDate() {
  const dispatch = useAppDispatch();
  const maxDate = dayjs(new Date("2023-01-03"));
  const minDate = dayjs(new Date("2023-01-02"));
  const [date, setDate] = useState<Dayjs>();
  const [hour, setHour] = useState<number>(12);

  const marks = [
    {
      value: 0,
      label: '0hs',
    },
    {
      value: 12,
      label: '12hs',
    },
    {
      value: 23,
      label: '23hs',
    },
  ];
  
  function value(value: number) {
    setHour(value);
    return `${value}`;
  };

  const applyFilter = (): void => {
    let format = dayjs(date).format("YYYY/MM/DD");
    dispatch(filterByDate({format, hour}))
  };
 
  return (
    <div className={style.contentFilter}>
        <AccordionComponent title={"Filtros por fecha"} open="up">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Fecha"
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newValue: any) => setDate(newValue)}
                className={style.picker}
                />
                 <Box sx={{ width: 215}}>
                    <Slider
                      aria-label="Hours"
                      defaultValue={12}
                      getAriaValueText={value}
                      step={1}
                      max={23}
                      valueLabelDisplay="auto"
                      marks={marks}
                    />
                  </Box>
                <Button className={style.button} disabled={date === undefined ? true : false} variant="outlined" onClick={() => applyFilter()}>Buscar <SearchIcon/></Button>
            </LocalizationProvider>
        </AccordionComponent>
    </div>
  );
}
