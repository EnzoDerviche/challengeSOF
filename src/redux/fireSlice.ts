import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fire } from "../types";
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween';
import day1 from "../api/2023-01-01/T00.json";
import day2 from "../api/2023-01-02/T00.json";
dayjs.extend(isBetween);

interface Fires {
    count: number,
    fires: Fire[],
    firesFiltered: Fire[]
    filters: Record<string, boolean>
}

const initialState: Fires = {
    count: 0,
    fires: [],
    firesFiltered: [],
    filters: {
        procesado: true,
        saturado: true,
        probAlta: true,
        probMedia: true,
        probBaja: true,
        nubes: true
    }
};

export const fireSlice = createSlice({
    name: "fire",
    initialState,
    reducers: {
        setOriginFires: (state, ) => {
                let fires: Fire[] = getData(day1.data.getPublicWildfireByDate.items);
                state.fires = fires;
                state.firesFiltered = fires;
                state.count = fires.length;
        },
        setFires: (state, action: PayloadAction<Fire[]>) => {
            const newState: Fire[] = getDataFilter(action.payload, state.filters);
            state.firesFiltered = newState;
            state.count = newState.length;
        },
        changeFilters: (state, action: PayloadAction<string>) => {
            state.filters[action.payload] = state.filters[action.payload] ? false : true;
            const newState: Fire[] = getDataFilter(state.fires, state.filters);
            state.firesFiltered = newState; 
            state.count = newState.length;
        },
        filterByDate: (state, action: PayloadAction<any>) => { 
            let datePayload: Dayjs = dayjs(action.payload.format).hour(action.payload.hour);
            const dayPayloadModify = datePayload.add(1, 'hour');  
            const fires: any = getData(action.payload.format === "2023/01/01" ? day1.data.getPublicWildfireByDate.items : day2.data.getPublicWildfireByDate.items);
            let newFiltered: Fire[] = fires.filter((el: Fire) => {
                let dateFire = dayjs(el.id.split("+")[0]);
                if(dateFire.isBetween(datePayload, dayPayloadModify, null, "[]")){
                    return el;
                }
                return null;
            })
            state.fires = newFiltered;
            const newState: Fire[] = getDataFilter(newFiltered, state.filters);
            state.firesFiltered = newState;
            state.count = newState.length;
        },
        firesInPolygon: (state, action: PayloadAction<Fire[]>) => { 
            const trueFilters: Array<string> = verifyFilters(state.filters);
            let newState: Fire[] = action.payload.filter((el: Fire) => trueFilters.find(e => el.type === e));
            state.firesFiltered = newState; 
            state.count = newState.length;
        }
    }
})

export const { setOriginFires, setFires, changeFilters, filterByDate, firesInPolygon } = fireSlice.actions;
export default fireSlice.reducer;

const typesFilters: Record<string, Array<number>> = {
    procesado: [10, 30],
    saturado: [11, 31],
    probAlta: [13, 33 ,90],
    probMedia: [14, 34, 50],
    probBaja: [15, 35, 20],
    nubes: [12, 32],
}

function getDataFilter(data: Fire[], filters:  Record<string, boolean>){
    const trueFilters: Array<string> = verifyFilters(filters);
    let newState: Fire[] = data.filter((el: Fire) => trueFilters.find(e => el.type === e));
    return newState;
}

function getConfig(config: number){
    for (const key in typesFilters) {
        if(typesFilters[key].find(el => el === config)){
            return key;
        }
    }
}

function verifyFilters(data: Record<string, boolean>){
    const trueFilters: Array<string> = [];
    for (const key in data) {
        if (data[key] === true) {
            trueFilters.push(key);
        }
    }
    return trueFilters;
}

function getData(data: Fire[]){
    const fireTypes: Fire[] = data.map(el => {
        return { ...el, type: getConfig(el.conf) };
    });
    return fireTypes;
}