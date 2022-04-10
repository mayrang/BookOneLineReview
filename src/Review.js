import {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewStateContext} from "./App.js";
import MyButton from "./componants/MyButton.js";
import MyHeader from "./componants/MyHeader.js";
import { categoryList } from "./utils/categoryList.js";

const Review = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const reviewList = useContext(ReviewStateContext);
    useEffect(() => {
        if(reviewList.length > 0){
            const targetData = reviewList.find((it) => parseInt(it.id) === parseInt(id));
            if(targetData){
                setData(targetData);
            }else{
                alert("해당되는 페이지가 없습니다.");
                navigate("/", {replace:true});
            }
        }
        
    }, [reviewList, id, navigate]);
    if(!data){
        return (
            <div className="ReviewPage">
                로딩중입니다.
            </div>
        )
    }else{
        return (
            <div className="ReviewPage">
                <MyHeader headText={data.title} leftChild={<MyButton type={"default"} text={"뒤로가기"} onClick={() => navigate(-1)} />}
                rightChild={<MyButton type={"positive"} text={"수정하기"} onClick={() => navigate(`edit/${id}`)} />} />
                <article>
                    <section>
                        <h4>읽은 날짜 : {new Date(parseInt(data.date)).toISOString().slice(0, 10)}</h4>
                    </section>
                    <section>
                        <h4>별점</h4>
                        <img src={process.env.PUBLIC_URL + `/img/rating${data.rating}.png`} alt="error" />
                    </section>
                    <section>
                        <div className="review_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                    <h4>카테고리 : {categoryList.find((it) => parseInt(it.value) === parseInt(data.category)).name}</h4>
    
                </article>
            </div>
        );
    }
    
}

export default Review;