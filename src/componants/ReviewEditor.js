import {useCallback, useContext, useState, useRef} from "react";
import { categoryList } from "../utils/categoryList";
import { ReviewDispatchContext } from "../App.js";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const ratingList = [
    {value: 1,
    name: "1점"},
    {value: 2,
    name: "2점"},
    {value: 3,
    name: "3점"},
    {value: 4,
    name: "4점"},
    {value: 5,
    name: "5점"}

]



const ReviewEditor = () => {
    const {onCreate} = useContext(ReviewDispatchContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [rating, setRating] = useState(3);
    const [category, setCategory] = useState(0);
    const titleRef = useRef();
    const contentRef = useRef();
    const categoryRef = useRef();
    const navigate = useNavigate();


    const changeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const changeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const changeDate = useCallback((e) => {
        setDate(e.target.value);
    }, []);

    const changeRating = useCallback((e) => {
        setRating(e.target.value);
    }, []);

    const changeCategory = useCallback((e) => {
        setCategory(e.target.value);
    }, []);

    const handleSubmit = () => {
        if(category === 0){
            categoryRef.current.focus();
            return;
        }
        if(title.length < 1){
            titleRef.current.focus();
            return;
        }
        if(content.length < 5){
            contentRef.current.focus();
            return;
        }
        onCreate(title, content, date, rating, category);
        navigate("/");
    }

    return (
        <div className="ReviewEditor">
            <section>
                <h4>제목</h4>
                <input ref={titleRef} type="text" className="input_title" onChange={changeTitle}/>
            </section>
            <section>
                <h4>카테고리</h4>
                <select ref={categoryRef} className="input_category" value={category} onChange={changeCategory}>
                    {categoryList.map((it, idx) =>
                    <option key={idx} value={it.value}>{it.name}</option>)}
                </select>
            </section>
            <section>
                <h4>읽은 날짜</h4>
                <input type="date" className="input_date" value={date} onChange={changeDate} />
            </section>
            <section>
                <h4>별점 주기</h4>
                <select className="input_rating" value={rating} onChange={changeRating} >
                    {ratingList.map((it, idx) => 
                    <option key={idx} value={it.value}>{it.name}</option>)}
                </select>
            </section>
            <section>
                <h4>한줄평</h4>
                <textarea className="input_content" value={content} onChange={changeContent} />
            </section>
            <div className="control_box">
                <MyButton type={"negative"} onclick={() => navigate(-1, {replace:true})} text={"뒤로가기"} />
                <MyButton type={"positive"} onClick={handleSubmit} text={"저장하기"} />
            </div>
        </div>
    );
};

export default ReviewEditor;