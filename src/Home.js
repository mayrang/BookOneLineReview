import { useCallback, useContext, useEffect, useState} from "react";
import MyButton from "./componants/MyButton";
import MyHeader from "./componants/MyHeader";
import { ReviewStateContext} from "./App.js";
import ReviewList from "./componants/ReviewList.js";

const Home = () => {
    const reviewData = useContext(ReviewStateContext);
    const [month, setMonth] = useState(new Date());
    const [data, setData] = useState([]);
    const headText = `${month.getFullYear()}년 ${month.getMonth() + 1}월`;
    useEffect(() => {
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getTime();
        const lastDay = new Date(month.getFullYear(), month.getMonth()+1, 0, 23, 59, 59).getTime();
        setData(reviewData.filter((it) => parseInt(firstDay) <= parseInt(it.date) && parseInt(it.date) <= parseInt(lastDay)));
    }, [month, reviewData]);

    const increaseMonth = useCallback(()=> {
        setMonth(new Date(month.getFullYear(), month.getMonth()+1));
    }, [month]);

    const decreaseMonth = useCallback(() => {
        setMonth(new Date(month.getFullYear(), month.getMonth()-1));
    }, [month]);
    return (
        <div>
            <MyHeader leftChild={<MyButton text={"<"} onClick={decreaseMonth} type={"default"}/>}
            rightChild={<MyButton text={">"} onClick={increaseMonth} type={"default"} />} headText={headText} />
            <ReviewList data={data} />
        </div>
    );
}

export default Home;