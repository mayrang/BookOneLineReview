import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ReviewStateContext} from "./App.js";

const Review = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const reviewList = useContext(ReviewStateContext);
    useEffect(() => {
        const targetData = reviewList.find((it) => parseInt(it.id) == parseInt(id));
        if(targetData){
            setData(targetData);
        }else{
            alert("해당되는 페이지가 없습니다.");
            navigate(-1, {replace:True});
        }
        
    }, [reviewList]);
    return (
        <div className="ReviewPage">

        </div>
    );
}

export default Review;