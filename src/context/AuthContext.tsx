"use client"
import {createContext, useContext, useEffect, useRef, useState} from "react";
import { io } from 'socket.io-client';
import {createMessages} from "@/utils";
// import Peer from 'peerjs';
import {useRouter} from "next/navigation";

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
    socket: any
    localMediaStream: any
    callUser: ()=>void
    myVideo: any
    userCaller: any
    answerCall: ()=>void
    remoteVideo:any
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
    setMsg:(t:string)=>{},
    socket: undefined,
  localMediaStream: null,
    callUser:()=>{},
    myVideo: null,
    userCaller: null,
    answerCall:()=>{},
    remoteVideo: null
});

const SERVER:string | undefined |any =process.env.NEXT_PUBLIC_SERVER_URL
function AuthContextProvider({children}:any){
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState<User>();
    const [remoteUser, setRemoteUser] = useState<User>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<{_id: string; room: [string, string];}>({_id: '', room: ["", ""] });
    const [usersOnlines, setUsersOnlines] = useState<any>([]);
    let socket=useRef<any>()
    let peer=useRef<any>()
    const [msg, setMsg] = useState("");
    const myVideo= useRef<any>(null)
    const remoteVideo= useRef<any>(null)
    const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null >(null);
   const router= useRouter()
    const [userCaller, setUserCaller] = useState(null);


    const getMediaStream=() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
         // console.log("currentStream",mediaStream)
          setLocalMediaStream(mediaStream);
          // myVideo.current.srcObject = mediaStream;

      }).catch(err => console.log("err: ", err));

    }

    useEffect(() => {
        if (currentUser) {
            // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            //     .then((mediaStream) => {
            //         // console.log("currentStream",mediaStream)
            //         setLocalMediaStream(mediaStream);
            //         // myVideo.current.srcObject = mediaStream;
            //
            //     }).catch(err => console.log("err: ", err));
            const peerOptions = {
                path: '/',
                secure: true,
                config: {
                    iceServers: [
                        {
                            urls: [
                                process.env.NEXT_PUBLIC_STUN_URL,
                                //"stun:stun.l.google.com:19302"
                            ],
                        },
                    ],
                },
            };
            import('peerjs').then(({ default: Peer }) => {
                peer.current = new Peer(peerOptions);




            socket.current = io(SERVER);

            peer.current.on('error', (err: Error) =>
                console.log('Erreur du serveur Peer', err),
            );
            socket.current.on("connection", (data: string) => {
                //console.log("socket",data);
                // peer.current.on('open', (peerId: string) => { ;
                //     setsocketId(peerId);
                //     dispatch(setCurrentUser({ ...user, socketId: data }));})
                peer.current.on('open', (peerId: string) => {
                    console.log("open", peerId)
                    socket.current.emit("register-new-user", { ...currentUser, socketId: data, peerId: peerId });
                })


            });

            socket.current.on('user-connected', (users: any) => {
                //console.log("user connected", users);
                  // @ts-ignore
                setUsersOnlines((prevState)=>[...prevState,users]);
                socket.current.emit('user-connected',users);
            });
            socket.current.on("current-online-users", (initialOnlineUsers:any) => {
                // Mettez à jour l'état usersOnlines avec la liste initiale
                // console.log("initialOnlineUsers", initialOnlineUsers);
                setUsersOnlines(initialOnlineUsers);
            });

            socket.current.on("messages", (data: any) => {
              // @ts-ignore
                setMessages((prevState)=>[...prevState, data]);
            });

            socket.current.on("updated-users", (updatedOnlineUsers:any) => {
                // Mettez à jour l'état usersOnlines avec la liste mise à jour
                setUsersOnlines(updatedOnlineUsers);
            });

            socket.current.on('callUser', (data: any) => {
                // @ts-ignore
                 setUserCaller(data.from);
                router.push('/notification',data.from);
                // console.log("callUser", data);
                // alert("Vous avez un appel")
            });
                peer.current.on("call",(call:any)=>{

                  try {
                    call.on("stream",(remoteStream: any)=>{
                      //userVideo.current.srcObject=remoteStream
                    })
                  } catch (error) {
                    console.log("call error", error);
                   return alert("Error calling")
                  }
                  console.log("callEvent some",call)
                })
            });
        }
    }, [currentUser]);





    // console.log("usersOnlines", usersOnlines);




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

    async function myAsyncFunction(mediaStream:MediaStream) {
        if (myVideo.current) {
            myVideo.current.srcObject=mediaStream;
        } else {
            // Attendez que myVideo.current soit défini
            await new Promise(resolve => setTimeout(resolve, 100));
            myAsyncFunction(mediaStream);
        }
    }
    const callUser = async () => {
        try {
            const userToCall = usersOnlines.find((user: { _id: string }) => user._id === remoteUser?._id);

             console.log("remoteUser: " + userToCall.peerId)
            if (userToCall && !userToCall.peerId) {
                return alert(`${userToCall.username} n'est pas connecté`);
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            await myAsyncFunction(mediaStream)
            setLocalMediaStream(mediaStream)
           // myVideo.current.srcObject = mediaStream;
            //console.log(localMediaStream)

            const call = peer.current.call(userToCall.peerId, mediaStream);

            call.on("stream", (remoteStream: any) => {
                remoteVideo.current.srcObject = remoteStream;
            });

            socket.current.emit('callUser', { userToCall: remoteUser, from: currentUser });
            router.push("/call")
        } catch (error) {
            console.log("Erreur lors de l'appel", error);
            //alert("Une erreur est survenue lors de l'appel");s
        }
    };

    const answerCall = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalMediaStream(mediaStream);

            // Répondez à l'appel en utilisant la connexion existante
            peer.current.on("call", (call:any) => {
                call.answer(mediaStream);
                call.on("stream", async(remoteStream:MediaStream) => {
                    await myAsyncFunction(mediaStream)
                  //  remoteVideo.current.srcObject = remoteStream;
                });
            });
              await myAsyncFunction(mediaStream)
            // Vous pouvez éventuellement ajouter du code ici pour gérer la visualisation de la vidéo à distance.

            // Redirigez l'utilisateur vers la page d'appel
            router.push("/call");
        } catch (error) {
            console.log("Erreur lors de la réponse à l'appel", error);
            // Gérez les erreurs en conséquence
        }
    };


    return (
            <AuthContext.Provider value={{
                token,setToken,currentUser ,setCurrentUser,remoteUser,setRemoteUser,messages,setMessages,
                currentChat,setCurrentChat,usersOnlines,setUsersOnlines,handleSubmit,msg,setMsg,socket,localMediaStream,
                callUser,myVideo,userCaller,    answerCall, remoteVideo
            }}>
                {children}
            </AuthContext.Provider>
        )


}

export default AuthContextProvider

export function useAuth() {
    return useContext(AuthContext);
}
