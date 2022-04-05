import { useMemo } from "react";

const MyButton = ({type, text, onClick}) => {
    const checkType = useMemo(() => {
        if(type !== "default" && type !== "positive" && type !== "negative"){
            return "default";
        }else{
            return type;
        }
    }, [type]);
    
    return (
        <div onClick={onClick} className={["MyButton", `MyButton_${checkType}`].join(" ")} >
            {text}
        </div>
    );
};

export default MyButton;