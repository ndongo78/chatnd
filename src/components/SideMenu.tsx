"use client"
import React, {useState} from 'react';
import Image from "next/image";
import {AiFillWechat,AiOutlineSetting} from "react-icons/ai"
import Link from "next/link";
import {LiaUsersSolid} from "react-icons/lia";
import {BsTrash} from "react-icons/bs"
import {GrSchedule} from "react-icons/gr";




export const SideMenu=()=> {
    const [ishover, setIshover] = useState("message");

    return (
        <div className={"h-screen relative w-2/12"}>
          <div className="flex items-center gap-2 bg-blue-200 border-b-2 h-14 ">
              <Image src={"/logo.png"} width={50} height={50} alt={"logo"} className={"p-2"}/>
              <h3 className="text-xl italic  font-bold p-3">let connect</h3>
          </div>
            <div className=" flex flex-col self-center m-6 items-center ">
             <Image src={"/user.jpg"} width={100} height={100} alt={"user"} className={"rounded-full"} style={{borderRadius:'50%'}} />
             <div className="flex flex-col self-center mt-4">
                 <p className={"text-center text-bold"}>John Doe</p>
                 <p className={"text-center opacity-50"}>john@yahoo.fr</p>
             </div>
            </div>
            <div className={"border-slate-800-100 border-b-2 mt-4 mb-4"} />
            <div className="w-full  flex flex-col gap-6 ml-3">
                <div  onClick={()=>setIshover("message")} className={`flex items-center gap-4 cursor-pointer  ${ishover == "message" && "bg-white text-blue-600 p-2 w-60"}`}>
                 <AiFillWechat size={40} />
                <span className={"text-xl"}>Messages</span>
                </div>
                <div  onClick={()=>setIshover("contact")} className={`flex items-center gap-4 cursor-pointer ${ishover == "contact" && "bg-white text-blue-600 p-2  w-60"}`}>
                 <LiaUsersSolid size={40} />
                <span>Contacts</span>
                </div>
                <div   onClick={()=>setIshover("agenda")} className={`flex items-center gap-4 cursor-pointer ${ishover == "agenda" && "bg-white text-blue-600 p-2  w-60"}`}>
                 <GrSchedule size={30} />
                 <span>Mon agenda</span>
                </div>
                <div   onClick={()=>setIshover("parametres")} className={`flex items-center gap-4 cursor-pointer ${ishover == "parametres" && "bg-white text-blue-600 p-2  w-60"}`}>
                 <AiOutlineSetting size={30} />
                 <span>Paramétres</span>
                </div>
                <div onClick={()=>setIshover("corbeille")} className={`flex items-center gap-4 cursor-pointer ${ishover == "corbeille" && "bg-white text-blue-600 p-2  w-60"}`}>
                 <BsTrash size={30}/>
                 <span>Corbeille</span>
                </div>
            </div>
            <div className="absolute bottom-1 left-10 right-10 cursor-pointer">
                <p>Deconnexion</p>
            </div>
        </div>
    );
}

