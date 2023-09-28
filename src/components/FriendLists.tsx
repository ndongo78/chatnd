import React, {useEffect, useState} from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {getAllUsers, getConversations, getMessages, userConversation} from "@/utils";

import jwt_decode from "jwt-decode";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {log} from "util";

export const userss:{id:number,name:string,avatar:string,message:string}[] = [
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
    }, {
        id: 6,
        name: 'Billy M',
        avatar: 'https://picsum.photos/200',
        message: 'cva'
    },
];

interface PropsTypes {
    setCurrentUserSelected: (u:any)=>void;
}
export const FriendLists=()=> {
    const router= useRouter()
    const [isLogin, setIsLogin] = useState(false);
    const { token , currentUser,setRemoteUser,setMessages,setCurrentChat,usersOnlines} = useAuth();
    const [users, setUsers] = useState<any>([]);

    const utilisateursAvecStatut = users.map((utilisateur:any) => {
        const utilisateurEnLigne = usersOnlines.find((u) => u._id === utilisateur._id);
        return {
            ...utilisateur,
            enLigne: !!utilisateurEnLigne,
        };
    });
    console.log('status',utilisateursAvecStatut)


    useEffect(() => {
        const tokenFrom= localStorage.getItem("token")
        if(tokenFrom && token){
            setIsLogin(true)
            getAllUsers(token)
                .then(response => {
                    const friends = response.filter((user:any) => user._id != currentUser?._id)
                    setUsers(friends)
                })
                .catch(error => console.log('error',error))
        }else{
            router.push("/")
        }
    }, [isLogin]);

    const handleSelect=(userTo:any)=>{
        const discution={
               senderId: currentUser?._id,
                receiverId: userTo._id
        }
        getConversations(userTo._id,token)
            .then((data) => {
                // console.log("data",data)
                setCurrentChat(data)
                if(data != null) {
                    getMessages(data._id,token)
                        .then(response => {
                            setMessages(response)
                            console.log("messages",response)})
                        .catch(error=>console.log('error message',error))
                    // console.log("conversations",data)
                }else{
                    userConversation(discution,token)
                        .then(data=>{
                            // console.log("created conversation",data)
                            setCurrentChat(data)
                            getMessages(data._id,token)
                                .then(response => {
                                    setMessages(response)
                                    console.log("messages",response)})
                                .catch(error=>console.log('error message',error))
                        })
                        .catch(err=>{
                            alert(JSON.stringify(err.response.data))
                            console.log("err",err);
                        });
                }

            })
            .catch((error) => {
                console.log("error: ",error.response.data)
            })
    }


    return (
        <div className={"bg-[#f1f9fd]  md:w-3/12 sm:w-3/12 "}>
            <div className="flex items-center h-20 border-b-2 bg-blue-500 border-x-2">
                <AiOutlineSearch size={30} className={"ml-2"} />
                <input type="text" placeholder={"rechercher un ami"} className={" ml-1 h-full w-full bg-blue-500 placeholder:text-black"} style={{border:"none",outline:"none"}}/>
            </div>
            <div className={'flex flex-row overflow-y-scroll h-screen  xl:flex-col md:flex-col gap-16 overflow-x-scroll  sm:flex-col '}>
                {
                    users.map((user:any)=>(
                        <div className={"flex items-center w-full border-b-2 border-blue-100 cursor-pointer hover:bg-blue-100"} key={user.name} onClick={()=> {
                            handleSelect(user)
                            setRemoteUser(user)
                        }}>
                            <Image src={'https://picsum.photos/200'} alt={"avatar"} width={50} height={40} className={"rounded-full m-5"} />
                            <div className=" w-full">
                             <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-1">
                                 <div className={`w-2 h-2 rounded-full ${usersOnlines.find(u=>u._id ===user._id) ? "bg-green-500": "bg-red-600"}` }/>
                                 <h3> {user.username} </h3>
                                 </div>
                                 <p className={"mr-2"}>5mn</p>
                             </div>
                                {/*<p className={"ml-3 opacity-50"}> {user.message} </p>*/}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

