import React from "react"
import styled, {keyframes} from "styled-components";
import Image from "next/image";
import {SpaceProps, space} from "styled-system";

const fadeIn = keyframes`
 0% { opacity: 0;transform:translateX(0)}
 30% { opacity: 1;transform:translateX(-2px)}
 60% { opacity: 1;transform:translateX(2px)}
 100% { opacity: 1;transform:translateX(0)}
`


const Message = styled.p`
    font-size:12px;
    color:#f18f6b;
    font-weight:500;
    display:flex;
    align-items:center;
    min-width:fit-content;
    height:15px;
        animation-name: ${fadeIn};
     animation-duration: 1s;
     animation-iteration-count: 1;

`
const Img = styled.div<SpaceProps>`
    height:15px;
    margin: auto 0px auto 0;
    ${space}
`

interface IProps {
    message?: string|boolean;
}

const BelowMessage = ({message = ''}: IProps) => {
    return <Message>
        {message}
    </Message>
}
export default BelowMessage