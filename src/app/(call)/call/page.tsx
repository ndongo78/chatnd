"use client"
import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import {ImPhoneHangUp} from 'react-icons/im'
import "@/styles/video.scss"
import {useRouter} from "next/navigation";
function Page() {
    const {remoteUser,myVideo,currentUser} = useAuth()
    const router=useRouter()

    useEffect(() => {
       if(!currentUser){
           router.push("/")
       }
    }, [currentUser]);

    return (
        <>
            <div className="modale"
            >

                <div className="userto">
                    <h3> {remoteUser?.username} </h3>
                    <p>Appel en cour</p>
                </div>
                <div className=' flex'>
                    <div className=" ">

                        <video playsInline  ref={myVideo}  autoPlay className="video" />

                    </div>
                    {/*<div className=''>*/}
                    {/*    <video playsInline  ref={userVideo}  autoPlay className="video" />*/}
                    {/*</div>*/}

                </div>


                <div className="btn-container">
                    <ImPhoneHangUp size={50}/>
                </div>
            </div>
        </>
    );
}

export default Page;
