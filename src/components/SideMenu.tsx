"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {AiFillWechat,AiOutlineSetting,AiOutlineMenuFold} from "react-icons/ai"
import Link from "next/link";
import {LiaUsersSolid} from "react-icons/lia";
import {BsTrash} from "react-icons/bs"
import {GrSchedule} from "react-icons/gr";

interface Props {
    showMenu: boolean
    setShowMenu:(t:boolean) => void
}


export const SideMenu=({showMenu,setShowMenu}:Props)=> {
    const [ishover, setIshover] = useState("message");




    return (
        <>
            <AiOutlineMenuFold className={"absolute right-2 top-3 cursor-pointer block  md:hidden sm:absolute z-50 bg-blue-950 text-white p-2 rounded-full "} size={40} onClick={()=>setShowMenu(!showMenu)} />
            {
                showMenu && <div className={`xl:block md:block   sm:hidden h-screen relative w-12/12 flex flex-col items-center`}>
                    <div className="flex items-center gap-2 bg-blue-500 border-b-2 h-14 w-full">
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
                    <div className="w-full  flex flex-col gap-6 ml-3 sm:self-center ">
                        <div  onClick={()=>setIshover("message")} className={`flex items-center gap-4 cursor-pointer sm:self-center  ${ishover == "message" && "bg-white text-blue-600 p-2"}`}>
                            <AiFillWechat size={40} />
                            <span className={"text-xl"}>Messages</span>
                        </div>
                        <div  onClick={()=>setIshover("contact")} className={`flex items-center gap-4 cursor-pointer ${ishover == "contact" && "bg-white text-blue-600 p-2 "}`}>
                            <LiaUsersSolid size={40} />
                            <span>Contacts</span>
                        </div>
                        <div   onClick={()=>setIshover("agenda")} className={`flex items-center gap-4 cursor-pointer ${ishover == "agenda" && "bg-white text-blue-600 p-2 "}`}>
                            <GrSchedule size={30} />
                            <span>Mon agenda</span>
                        </div>
                        <div   onClick={()=>setIshover("parametres")} className={`flex items-center gap-4 cursor-pointer ${ishover == "parametres" && "bg-white text-blue-600 p-2"}`}>
                            <AiOutlineSetting size={30} />
                            <span>Paramétres</span>
                        </div>
                        <div onClick={()=>setIshover("corbeille")} className={`flex items-center gap-4 cursor-pointer ${ishover == "corbeille" && "bg-white text-blue-600 p-2"}`}>
                            <BsTrash size={30}/>
                            <span>Corbeille</span>
                        </div>
                    </div>
                    <div className="absolute bottom-1 left-10 right-10 cursor-pointer">
                        <p>Deconnexion</p>
                    </div>
                </div>

            }
        </>
    );
}

