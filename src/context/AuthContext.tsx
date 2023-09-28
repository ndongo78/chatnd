"use client"
import {createContext, useContext, useEffect, useRef, useState} from "react";
import { io } from 'socket.io-client';
import {createMessages} from "@/utils";

export type User ={
    username:string,
    email:string,
    _id:string,
    friendIn:[],
    friendOut:[],
    phoneNumber: number,
    password:string,
    _v:number,
    updatedAt:string
}
export  type Message ={_id?:string; conversationId: string; senderId: string | undefined;
    receiverId: string | undefined; content: string; createdAt: Date | undefined;}
const AuthContext=createContext<{
    token:string,
    setToken:(token:string) => void,
    currentUser:User | undefined,
    setCurrentUser:(user:User) => void
    remoteUser: User | undefined
    setRemoteUser:(user:User) => void
    messages:Message[],
    setMessages:(message:any) => void
    currentChat: {
        _id:string,
        room:[string,string]
    }
    setCurrentChat:(chat:any) => void
    usersOnlines: {_id:string; conversationId: string; senderId: string | undefined; receiverId: string | undefined; content: string; }[]
    setUsersOnlines:(users:any) => void
    handleSubmit:( )=> void
    msg: string
    setMsg: (t:string)=>void
}>({
    token: "",
    setToken: (token:string) => {},
    currentUser: undefined,
    setCurrentUser: (currentUser:User) => {},
    remoteUser: undefined,
    setRemoteUser: (user:User) => {},
    messages: [],
    setMessages:(m:any)=>{},
    setCurrentChat:(t:any)=>{},
    currentChat:{_id: '', room: ['', '']} ,
    usersOnlines: [],
    setUsersOnlines:(t:any)=>{},
    handleSubmit:()=>{},
    msg:"",
    setMsg:(t:string)=>{}
});

const SERVER:string | undefined |any =process.env.NEXT_PUBLIC_SERVER_URL
function AuthContextProvider({children}:any){
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState<User>();
    const [remoteUser, setRemoteUser] = useState<User>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<{_id: string; room: [string, string];}>({_id: '', room: ["", ""] });
    const [usersOnlines, setUsersOnlines] = useState([]);
    let socket=useRef<any>()
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (currentUser) {


            //peer.current = new Peer(peerOptions);

            socket.current = io(SERVER);

            socket.current.on("connection", (data: string) => {
                console.log("socket",data);
                // peer.current.on('open', (peerId: string) => { ;
                //     setsocketId(peerId);
                //     dispatch(setCurrentUser({ ...user, socketId: data }));})
                    socket.current.emit("register-new-user", { ...currentUser, socketId: data, peerId: "peerId" });

            });

            socket.current.on('user-connected', (users: any) => {
                  setUsersOnlines(users);
            });

            socket.current.on("messages", (data: any) => {
              // @ts-ignore
                setMessages((prevState)=>[...prevState, data]);
            });

            socket.current.on("disconnect", () => {
                socket.current.on('getUsers', (users: any) => {

                });
            });

            socket.current.on('callUser', (data: any) => {

            });
        }
    }, [currentUser]);

    const handleSubmit=() => {
        if(currentChat){
            const mgsTo={
                conversationId:currentChat._id,
                senderId:currentUser?._id,
                receiverId:remoteUser?._id,
                content:msg,
                createdAt: new Date(),
                //socketId:recever.socketId
            }

            setMessages([...messages,mgsTo])

            socket.current.emit("sendMessage",mgsTo)
            createMessages(mgsTo,token)
                .then(data=>{
                    //dispatch(updateMsg(data))
                    setMsg("")
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

    return (
            <AuthContext.Provider value={{
                token,setToken,currentUser ,setCurrentUser,remoteUser,setRemoteUser,messages,setMessages,
                currentChat,setCurrentChat,usersOnlines,setUsersOnlines,handleSubmit,msg,setMsg
            }}>
                {children}
            </AuthContext.Provider>
        )


}

export default AuthContextProvider

export function useAuth() {
    return useContext(AuthContext);
}
