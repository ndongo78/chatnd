import Image from 'next/image'
import  {SideMenu, FriendLists , Chat , FriendDetail} from "@/components";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <div className="flex">

              <SideMenu />
              <FriendLists/>

              <Chat />

              <FriendDetail/>
      </div>
    </main>
  )
}
