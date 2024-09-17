import {useEffect, useRef} from "react";

export default function usePrevious(value:any,q=false) {
    const ref = useRef();
    useEffect(() => {

        ref.current = value;
        if (q){
            ref.current={...value}
        }

    },[value]);

    return ref.current;
}