import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {BsCameraVideo,BsEmojiSmile} from "react-icons/bs"
import {FiPhone} from "react-icons/fi"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {SiUploaded} from "react-icons/si"
import {RiMic2Fill} from "react-icons/ri"
import {AiOutlineSend} from "react-icons/ai"
import "@/styles/chat.scss"
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {Message} from "@/components/Message";
import {createMessages, getMessages} from "@/utils";

interface Props {
    currentUserSelected: any
}
export const Chat = () => {
    const [tokenFrom, setTokenFrom] = useState<string>("");
    const {remoteUser,messages,setMessages,currentChat,callUser,token,handleSubmit,msg,setMsg}=useAuth()


    const router=useRouter()


    useEffect(() => {
      const token= localStorage.getItem("token")

      if(token){
          setTokenFrom(token)
      }else {
          router.push("/")
      }
    }, [tokenFrom]);


    useEffect(() => {
        getMessages(currentChat?._id,token)
            .then(response => {
                setMessages(response)
                //console.log("messages",response)
            })
            .catch(error=>console.log('error message',error))
    }, [currentChat?._id, token]);





   return <div className={"h-screen relative  sm:w-5/12 bg-white"}>
        <div className="flex items-center h-20 border-b-2">
            <div className="bg-blue-500 w-full h-full  shadow flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image src={'https://picsum.photos/200'} alt={"avatar"} width={50} height={50} className={"rounded-full ml-3"} />
                 <div className="">
                     <p>{remoteUser?.username} </p>
                     <p>status</p>
                 </div>
                </div>
                <div className="flex items-center gap-4 mr-2 ">
                    <div className={" rounded-full p-2 cursor-pointer iconsChat"} >
                        <FiPhone size={25} className={"opacity-50 bg-opacity-70"}  />
                    </div>
                    <div className={" rounded-full p-2 cursor-pointer iconsChat"} onClick={callUser} >
                    <BsCameraVideo size={25} className={"opacity-50 bg-opacity-70"}/>
                    </div>
                    <div className={"iconsChat rounded-full p-2 cursor-pointer"} >
                    <BiDotsVerticalRounded size={25} className={"opacity-50 bg-opacity-70"}/>
                    </div>
                </div>
            </div>
        </div>
       <div className="chat-messages flex flex-col justify-between">
           {messages.map((message,index) =><Message key={index} message={message} />)}
           </div>
           <div className="chat-footer bg-blue-500 w-full absolute bottom-0">
               <div>
                   <SiUploaded className="iconsChat" />
               </div>
               <input
                   type="text"
                   className="w-6/12 h-11 rounded-md  border-0 outline-0 "
                   placeholder="envoyer un a john ..."
                   onChange={(e)=>setMsg(e.target.value)}
                   value={msg}
               />
               <div className="flex gap-5">
                   <RiMic2Fill className="iconsChat" />
                   <BsEmojiSmile className="iconsChat" />
                   {
                       msg != "" && <AiOutlineSend className="iconsChat save" onClick={handleSubmit} />
                   }
                   {/*<AiOutlineSend className="iconsChat save" onClick={()=>{}} />*/}
               </div>
           </div>
       </div>
};

