import React from 'react';
import PropTypes from 'prop-types';
import {AiOutlineSearch} from "react-icons/ai";
import Image from "next/image";

export const users:{id:number,name:string,avatar:string,message:string}[] = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://picsum.photos/200/300',
        message: 'hello'
    },
    {
        id: 2,
        name: 'Billy',
        avatar: 'https://picsum.photos/200',
        message: 'cva'
    },
    {
        id: 3,
        name: 'Lolo',
        avatar: 'https://picsum.photos/200/',
        message: 'bien '
    },
    {
        id: 4,
        name: 'Zack Doe',
        avatar: 'https://picsum.photos/200/300/',
        message: 'et bob le '
    },
    {
        id: 2,
        name: 'Billy M',
        avatar: 'https://picsum.photos/200',
        message: 'cva'
    },
];

interface PropsTypes {
    setCurrentUserSelected: (u:any)=>void;
}
export const FriendLists=({setCurrentUserSelected}:PropsTypes)=> {
    return (
        <div className={"bg-[#f1f9fd]  md:w-3/12 sm:w-3/12 overflow-y-scroll"}>
            <div className="flex items-center h-14 border-b-2">
                <AiOutlineSearch size={30} className={"ml-2"} />
                <input type="text" placeholder={"rechercher un ami"} className={" ml-1 h-full w-full bg-[#f1f9fd]"} style={{border:"none",outline:"none"}}/>
            </div>
            <div className={'flex flex-row  xl:flex-col md:flex-col gap-16 overflow-x-scroll  sm:flex-col '}>
                {
                    users.map((user)=>(
                        <div className={"flex items-center w-full border-b-2 border-blue-100 cursor-pointer hover:bg-blue-100"} key={user.name} onClick={()=>setCurrentUserSelected(user)}>
                            <Image src={user.avatar} alt={"avatar"} width={50} height={40} className={"rounded-full m-5"} />
                            <div className=" w-full">
                             <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-1">
                                 <div className={"w-2 h-2 rounded-full bg-red-600 "}/>
                                 <h3> {user.name} </h3>
                                 </div>
                                 <p className={"mr-2"}>5mn</p>
                             </div>
                                <p className={"ml-3 opacity-50"}> {user.message} </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

