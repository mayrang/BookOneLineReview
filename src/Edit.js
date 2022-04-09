import { useContext} from "react";
import { useParams } from "react-router-dom";
import {ReviewStateContext} from "./App.js";
import ReviewEditor from "./componants/ReviewEditor.js";

const Edit = () => {
    const reviewList = useContext(ReviewStateContext);
    const {id} = useParams();

    const targetData = reviewList.find((it) => parseInt(it.id) === parseInt(id));
    return (
      <ReviewEditor originData={targetData} />  
    );
};

export default Edit;