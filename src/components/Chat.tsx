import React from 'react';
import Image from "next/image";
import {BsCameraVideo,BsEmojiSmile} from "react-icons/bs"
import {FiPhone} from "react-icons/fi"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {SiUploaded} from "react-icons/si"
import {RiMic2Fill} from "react-icons/ri"
import {AiOutlineSend} from "react-icons/ai"

interface Props {
    currentUserSelected: any
}
export const Chat = ({currentUserSelected}:Props) => {

    const user=3

   return <div className={"h-screen relative  sm:w-5/12 bg-white"}>
        <div className="flex items-center h-14 border-b-2">
            <div className="bg-blue-500 w-full m-5 rounded shadow flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image src={currentUserSelected?.avatar} alt={"avatar"} width={50} height={50} className={"rounded-full ml-3"} />
                 <div className="">
                     <p>{currentUserSelected?.name} </p>
                     <p>status</p>
                 </div>
                </div>
                <div className="flex items-center gap-4 mr-2 ">
                    <div className={"bg-slate-200 rounded-full p-2 cursor-pointer"} >
                        <FiPhone size={25} className={"opacity-50 bg-opacity-70"}  />
                    </div>
                    <div className={"bg-slate-200 rounded-full p-2 cursor-pointer"} >
                    <BsCameraVideo size={25} className={"opacity-50 bg-opacity-70"}/>
                    </div>
                    <div className={"bg-slate-200 rounded-full p-2 cursor-pointer"} >
                    <BiDotsVerticalRounded size={25} className={"opacity-50 bg-opacity-70"}/>
                    </div>
                </div>
            </div>
        </div>
       <div className="chat-messages flex flex-col justify-between">
           <div className="messages">
               <div
                   className={`message ${user > 0 && "owner"} `}
                   // key={message._id}
                   // ref={ref}
               >
                   <div className="messageInfo">
                       <img src={"https://picsum.photos/200/300"} alt="" />
                   </div>
                   <div className="messageContent">
                       <p> hello </p>
                       {/* <img src={"https://picsum.photos/200/300"} alt="" /> */}
                       <span style={{ textAlign: "right" }}>just now</span>
                   </div>
               </div>
           </div>
           <div className="chat-footer bg-blue-500 w-full absolute bottom-0">
               <div>
                   <SiUploaded className="iconsChat" />
               </div>
               <input
                   type="text"
                   className="w-6/12 h-11 rounded-md outline-0 border-0 "
                   placeholder="envoyer un a john ..."
                   /*onChange={(e)=>setmgs(e.target.value)}
                   value={mgs}*/
               />
               <div className="flex gap-5">
                   <RiMic2Fill className="iconsChat" />
                   <BsEmojiSmile className="iconsChat" />
                   {/*{*/}
                   {/*    mgs != "" && <AiOutlineSend className="iconsChat save" onClick={handleSubmit} />*/}
                   {/*}*/}
                   <AiOutlineSend className="iconsChat save" onClick={()=>{}} />
               </div>
           </div>
       </div>
    </div>
};

