import React, { useEffect } from 'react';
import { Mapa } from './components/Map/Mapa';
import { useAppDispatch } from './redux/hooks';
import { setOriginFires } from './redux/fireSlice';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const dispatch = useAppDispatch();

   useEffect(() => {
    dispatch(setOriginFires());
   },[])

  return (
    <div className="App">
     <Mapa />
    </div>
  );
}

export default App;
