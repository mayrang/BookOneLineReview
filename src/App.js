import React, { useCallback, useEffect, useReducer, useRef, useMemo } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home.js";
import Edit from "./Edit.js";
import Review from "./Review.js";
import Write from "./Write";

const reducer = (state, action) => {
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
  localStorage.setItem("Review", JSON.stringify(newData));
  return newData;
}

export const ReviewStateContext = React.createContext();
export const ReviewDispatchContext = React.createContext();


function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(()=>{
    // localStorage.setItem("Review", JSON.stringify([{id:1, title:"test", content:"testing", category:1, rating:3, date:1649265799237}]))
    const localData = localStorage.getItem("Review");
    if(localData){
      const reviewData = JSON.parse(localData).sort((a,b)=> parseInt(b.id) - parseInt(a.id));
      idRef.current = parseInt(reviewData[0].id) + 1;
      dispatch({type:"INIT", data:reviewData});
    }
  }, []);

  const onCreate = useCallback((title, content, date, rating, category)=>{
    const newData = {
      id: idRef.current,
      title, 
      content,
      date: new Date(date).getTime(),
      rating, 
      category
    };
    dispatch({type:"CREATE", data:newData});
    idRef.current += 1;
  }, []);

  const onEdit = useCallback((targetId, newContent, newRating, newDate, newCategory) => {
    const editData = data.map((it) => parseInt(it.id) === parseInt(targetId) ? {content: newContent, rating: newRating, data: newDate, category: newCategory, ...it} : it);
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
