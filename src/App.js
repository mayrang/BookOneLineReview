import React, { useCallback, useEffect, useReducer, useRef, useMemo } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home.js";
import Edit from "./Edit.js";
import Review from "./Review.js";
import Write from "./Write";

const reducer = (action, state) => {
  let newData = [];
  switch(action.type){
    case "INIT":
      return action.data;
    case "CREATE":
      newData = [
        action.data,
        ...state
      ];
      break;
    case "EDIT":
      newData = action.data;
      break;
    case "REMOVE":
      newData = action.data;
      break;
    default:
      return state;
  }
  localStorage.setItem("Diary", JSON.stringify(newData));
  return newData;
}

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);
  const ReviewStateContext = React.createContext();
  const ReviewDispatchContext = React.createContext();

  useEffect(()=>{
    const localData = localStorage.getItem("Diary");
    if(localData){
      const reviewData = JSON.parse(localData).sort((a,b)=> parseInt(a.id));
      idRef.current = parseInt(reviewData[0].id) + 1;
      dispatch({type:"INIT", data:reviewData});
    }
  }, []);

  const onCreate = useCallback((title, content, date, rating )=>{
    const newData = {
      id: idRef.current,
      title, 
      content,
      date,
      rating
    };
    dispatch({type:"CREATE", data:newData});
    idRef.current += 1;
  }, []);

  const onEdit = useCallback((targetId, newContent, newRating, newDate) => {
    const editData = data.map((it) => parseInt(it.id) === parseInt(targetId) ? {content: newContent, rating: newRating, data: newDate, ...it} : it);
    dispatch({type:"EDIT", data: editData});
  }, [data]);

  const onRemove = useCallback((targetId) => {
    const remainedData = data.filter((it) => parseInt(it.id) !== parseInt(targetId));
    dispatch({type:"REMOVE", data: remainedData});
  }, [data]);

  const memorizedDispatch = useMemo(() => {
    return {onCreate, onEdit, onRemove};
  }, [onCreate, onEdit, onRemove]);
  return (
    <ReviewStateContext.Provider value={data}>
    <ReviewDispatchContext.Provider value={memorizedDispatch} >
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/write"} element={<Write />} />
      <Route path={"/review/:id"} element={<Review />} />
      <Route path={"/edit/:id"} element={<Edit />} />
    </Routes>
    </div>
    </BrowserRouter>
    </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider> 
  );
}

export default App;
