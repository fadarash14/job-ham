import {Dispatch, useEffect, useState} from "react";
import {number} from "prop-types";

export function Timer(props:{timer: string, setTimer : Dispatch<string>, Duration: number, callTimer: boolean}){
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');

    function  startTimer (){
        const Start =  Date.now();
        const setIntervalID = setInterval(()=> {
            const difference = props.Duration - (((Date.now() - Start) / 1000) | 0);

            const secondCounter = Math.floor((difference % 60 ));
            const minuteCounter = Math.floor((difference / 60));

            const stringSecond = String(secondCounter).length  === 1 ? `0${secondCounter}`: secondCounter.toString();
            const stringMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter.toString();

            if (difference < 0) {
                clearInterval(setIntervalID);
               props.setTimer('off');
            } else{
                setSecond(stringSecond);
                setMinute(stringMinute);
            }
        },1000);
    }
    useEffect(()=>{
        if (props.callTimer)
            startTimer()
    },[props.callTimer])

    return(<>
        {minute}:{second}
        </>
    )
}