
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryList } from "../utils/categoryList.js";
import MyButton from "./MyButton.js";
import ReviewItem from "./ReviewItem.js";


const dateList = [
    {value: "latest",
    name: "최신순"},
    {value: "oldest",
    name: "오래된 순"}
]

const ControlMenu = ({value, onChange, optionList}) => {

    return(
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => 
            <option key={idx} value={it.value}>{it.name}</option>
            )}
        </select>
    )
}



const ReviewList = ({data}) => {
    const navigate = useNavigate()
    const [sortCategory, setSortCategory] = useState(0);
    const [sortDate, setSortDate] = useState("latest");
    const getProcessReviewList = useMemo(() => {
        const copyList = JSON.parse(JSON.stringify(data));
        let filteredList = [];
        switch(sortCategory){
            case 0:
                filteredList = copyList;
                break;
            case 1:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(1));
                break;
            case 2:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(2));
                break;
            case 3:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(3));
                break;
            case 4:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(4));
                break;
            case 5:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(5));
                break;
                
            case 6:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(6));
                break;
            case 7:
                filteredList = copyList.filter((it) => parseInt(it.category) === parseInt(7));
                break;    
            default:
                filteredList = copyList;
                break;
        }
        let sortedList = [];
        if(sortDate === "latest"){
            sortedList = filteredList.sort((a, b) => parseInt(b.date) - parseInt(a.date));

        }else{
            sortedList = filteredList.sort((a, b) => parseInt(a.date) - parseInt(b.date));
        }
        return sortedList;
    }, [data, sortCategory, sortDate]);
    return (
        <div className="ReviewList">
            <div className="menu_wrapper">
                <div className="right_col">
                    <ControlMenu value={sortDate} optionList={dateList} onChange={setSortDate} />
                    <ControlMenu value={sortCategory} optionList={categoryList} onChange={setSortCategory} />
                </div>
                <div className="left_col">
                    <MyButton text={"새 일기쓰기"} onClick={() => navigate("/write")} type={"positive"} />
                </div>
                {getProcessReviewList.map((it) => <ReviewItem key={it.id} {...it} />)}

            </div>
        </div>
    )
}

export default ReviewList;