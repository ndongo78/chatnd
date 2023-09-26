"use client"
import React, {useEffect, useState} from 'react';
import {SideMenu} from "@/components/SideMenu";
import {FriendLists} from "@/components/FriendLists";
import {Chat} from "@/components/Chat";
import {FriendDetail} from "@/components/FriendDetail";

export  const Layouts = () => {
    const [currentUserSelected, setCurrentUserSelected] = useState<any>(null);
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
       setShowMenu(true);
    }, []);


    useEffect(() => {
        const handleResize = () => {
            //console.log(window.innerWidth);
            if(window.innerWidth > 800){
                setShowMenu(true);
            }
        };

        // Ajoutez un écouteur d'événement de redimensionnement de la fenêtre lors de la première exécution
        window.addEventListener("resize", handleResize);

        // Retirez l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); //
    return (
        <div className="flex flex-col xl:flex-row md:flex-row sm:flex-row">
            <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            {/*<div className={"sm:border-slate-800-100 border-b-2 mt-4 mb-4"} />*/}
            <FriendLists setCurrentUserSelected={setCurrentUserSelected}/>
            {currentUserSelected && <Chat currentUserSelected={currentUserSelected} />}
            {/*{currentUserSelected && <FriendDetail/>}*/}

        </div>
    );
};

