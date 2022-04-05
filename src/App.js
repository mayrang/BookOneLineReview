import { useCallback, useEffect, useReducer, useRef } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home.js";

const reducer = (action, state) => {
  switch(action.type){
    case "INIT":
      return action.data;
    case "CREATE":
      return;
    case "EDIT":
      return;
    case "REMOVE":
      return;
    default:
      return state;
  }
}

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(()=>{
    const localData = localStorage.getItem("Diary");
    if(localData){
      const reviewList = JSON.parse(localData).sort((a,b)=> parseInt(a.id));
      idRef.current = parseInt(reviewList[0].id) + 1;
      dispatch({type:"INIT", data:reviewList});
    }
  }, [])
  const onCreate = useCallback((content, date, rating )=>{
    const newData = {
      id: idRef.current,
      content,
      date,
      rating
    };
    dispatch({type:"CREATE", data:newData});
    idRef.current += 1;

  }, []);
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path={"/"} element={<Home />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
