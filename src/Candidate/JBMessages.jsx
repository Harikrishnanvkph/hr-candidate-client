import {useEffect} from "react";
import {io} from "socket.io-client";
import {useSelector} from 'react-redux'

export default function JBMessages(){
    const user = useSelector((state)=>state.myStore.userCE)

    useEffect(()=>{
        const socketIO = io("http://localhost:3000",{
            path : "/js/Messages"
        })

        socketIO.on('initialize',user.mail);

        socketIO.on('connect',()=>{
            console.log('socket.io connection established')
        })

        socketIO.on('disconnect',()=>{
            console.log('socket.io connection terminated')
        })
    })


    return<>
        <div className="container chat-window">
            <div className="chat-window-sidebar row">

            </div>
            <div className="chat-window-user-chat row">

            </div>
        </div>
    </>
}