import Image from "next/image";
import React, {MouseEventHandler, PropsWithChildren, useState} from "react";
import styled, {keyframes} from "styled-components";
import {layout, LayoutProps, space, SpaceProps} from "styled-system";
import {fadeIn} from "react-animations";
import PopUP from "../Toast/PopUP";
const fadeInAnimation = keyframes`${fadeIn}`;

type ButtonWithPopUpProps={
    text:string,
    handleClick:MouseEventHandler,
}

const ImgWrapper = styled.div<SpaceProps|LayoutProps>`
    cursor:pointer;
    display:flex;
    color:#2d2c2c;
    font-size:14px;
    position:relative;
    align-items:center;
    width:fit-content;
    .show{
        visibility: visible;
        animation: 1s ${fadeInAnimation};
    }
    &:not(:last-child){
        margin-left:10px;
    }
    ${layout}
    ${space}
`

export default function ButtonWithTooltip(props:PropsWithChildren<ButtonWithPopUpProps>){
    const {handleClick, text}=props
    const [show, setShow]=useState(false)

    const popUp=(show:boolean)=>{
        if (!show){
            setShow(s=>!s)
        }else{
            setShow(show)
        }
    }

    return  (
        <ImgWrapper
                onClick={handleClick}
                onMouseEnter={() => {
                    popUp(true)
                }}
                onMouseLeave={() => {
                    popUp(false)
                }}>
                <PopUP text={text} show={show}/>
                {props.children}
        </ImgWrapper>
    )
}


ButtonWithTooltip.defaultProps ={
    handleClick: ()=>{}
}