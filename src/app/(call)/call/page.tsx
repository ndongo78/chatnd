"use client"
import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import {ImPhoneHangUp} from 'react-icons/im'
import "@/styles/video.scss"
import {useRouter} from "next/navigation";
function Page() {
    const {remoteUser,myVideo,currentUser,remoteVideo,localMediaStream} = useAuth()
    const router=useRouter()



    useEffect(() => {
       if(!currentUser){
           router.push("/")
       }
    }, [currentUser]);

    return (
        <>
            <div className="modale w-full h-screen"
            >

                <div className="userto">
                    <h3> {remoteUser?.username} </h3>
                    {/*<p>Appel en cour</p>*/}
                </div>
                <div className=''>
                        {
                            localMediaStream &&   <video playsInline  ref={myVideo}  autoPlay className="video w-52 h-52" />
                        }
                    {
                        remoteVideo.current ? <video playsInline  ref={remoteVideo}  autoPlay className="video" /> : <p className={"text-xl text-white"}>Remote user</p>
                    }
                </div>


                <div className="btn-container">
                    <ImPhoneHangUp size={50}/>
                </div>
            </div>
        </>
    );
}

export default Page;
