import { useNavigate} from "react-router-dom";
import MyButton from "./MyButton.js";
import React from "react";


const ReviewItem = ({id, title, date, rating})=> {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const getReview = () => {
        navigate(`/review/${id}`);
    }
    return (
        <div className="ReviewItem">
            <div onClick={getReview} className="star_wrapper">
                <img src={process.env.PUBLIC_URL + `img/rating${rating}.png`} alt="error" />
            </div>
            <div onClick={getReview} className="info_wrapper">
                <div className="review_date">{strDate}</div>
                <div className="review_content_preview">{title}</div>
            </div>
            <div className="btn_wrapper">
                <MyButton type={"positive"} onClick={() => navigate(`/edit/${id}`)} text={"수정하기"} />
            </div>
        </div>
    );
};

export default React.memo(ReviewItem);