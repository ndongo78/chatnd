"use client"
import React, {useEffect, useRef} from "react";
import {useAuth} from "@/context/AuthContext";
import "@/styles/chat.scss"

type Message={
    message: any
}
export const  Message=({message}:Message)=>{
    const ref = useRef<HTMLDivElement | null>(null);
    const {currentUser}=useAuth()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);



    return  <div className="messages">
        <div
            className={`message ${currentUser?._id === message.senderId && "owner"} `}
             key={message._id}
            ref={ref}
        >
            <div className="messageInfo mt-2">
                <img src={"https://picsum.photos/200/300"} alt="" />
            </div>
            <div className="messageContent mt-5">
                <p> {message.content} </p>
                {/* <img src={"https://picsum.photos/200/300"} alt="" /> */}
                <span style={{ textAlign: "right" }} className={"opacity-40"}>{`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()}`}</span>
            </div>
        </div>
    </div>
}
