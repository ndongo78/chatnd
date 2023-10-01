"use client"
import {IoIosCall} from "react-icons/io"
import {MdCallEnd} from "react-icons/md"
import "@/styles/notify.scss"
import {useParams, useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import React, {useEffect} from "react";


const NotificationCall = () => {
    const {userCaller,currentUser,remoteUser,answerCall,socket,myVideo}= useAuth()
    const params=useParams()

    const router = useRouter()



    // const {call,callAccepted,}=useContext(SocketContext)
    useEffect(() => {
      if(!currentUser){
          router.push("/")
      }
    }, [currentUser]);

    return (
        <div className='notifier' >
            {/*<video playsInline  ref={myVideo}  autoPlay className="video w-full h-full -z-50" />*/}
            <h4> {userCaller?.username} vous appel </h4>
            <div className="btns">
                <div className="accept">
                    <IoIosCall onClick={()=>answerCall()} />
                </div>
                <div className="reject">
                    <MdCallEnd />
                </div>
            </div>
        </div>
    )
}

export default NotificationCall
