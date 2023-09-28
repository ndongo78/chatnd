import axios from "axios";

const url:string | undefined |any  =process.env.NEXT_PUBLIC_API_URL

// const axiosInstance = axios.create({
//     headers: {
//         'Cache-Control': 'no-store', // Désactive la mise en cache dans le navigateur
//         'Pragma': 'no-cache', // Désactive également la mise en cache dans le navigateur pour les versions plus anciennes
//     },
// });
export const loginUser=async(user:{email:string,password:string}) => {
    const response=await axios.post(url+"users/login",user)
    return response.data
}
export const getAllUsers = async(token:string) => {
    const response=await axios.get(url+"users",{headers:{ Authorization: `Bearer ${token}`}})
    return response.data
}

export const userConversation=async(room: any,token: any) => {
    const response=await axios.post(url+"conversations",room,{headers:{Authorization: `Bearer ${token}`}})
    return response.data
}
export const getConversations = async(id:any,token:any) => {
    const response=await axios.get(url+`conversations/${id}`,
        {headers:{ Authorization:`Bearer ${token}`}}
    )
    return response.data
}

//messages
export const createMessages=async(roomId:any,token:any) => {
    const response=await axios.post(url+"messages",roomId,{
        headers:{
        Authorization: `Bearer ${token}`}
    })
    return response.data
}

export const getMessages = async(id:any,token:any) => {
    const response=await axios.get(url+`messages/${id}`,
        {headers:{ Authorization:`Bearer ${token}`}}
    )
    return response.data
}
