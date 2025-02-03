import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import './messages.css'

//for testing
const cnv_api = [
    {
        "conversation_id": "12345target67890",
        "sender": {
            "id": 12345,
            "name": "Hari"
        },
        "receiver": {
            "id": 67890,
            "name": "Shankar"
        },
        "message": [
            {
                "content": "Message 1 from Hari to Shankar",
                "sender_name": "Hari",
                "receiver_name": "Shankar",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12346target67891",
        "sender": {
            "id": 12346,
            "name": "John"
        },
        "receiver": {
            "id": 67891,
            "name": "Alice"
        },
        "message": [
            {
                "content": "Message 1 from John to Alice",
                "sender_name": "John",
                "receiver_name": "Alice",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12345target67892",
        "sender": {
            "id": 12345,
            "name": "Hari"
        },
        "receiver": {
            "id": 67892,
            "name": "Alex"
        },
        "message": [
            {
                "content": "Message 1 from Hari to Alex",
                "sender_name": "Hari",
                "receiver_name": "Alex",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12347target67893",
        "sender": {
            "id": 12347,
            "name": "Michael"
        },
        "receiver": {
            "id": 67893,
            "name": "Eva"
        },
        "message": [
            {
                "content": "Message 1 from Michael to Eva",
                "sender_name": "Michael",
                "receiver_name": "Eva",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12348target67894",
        "sender": {
            "id": 12348,
            "name": "David"
        },
        "receiver": {
            "id": 67894,
            "name": "Lily"
        },
        "message": [
            {
                "content": "Message 1 from David to Lily",
                "sender_name": "David",
                "receiver_name": "Lily",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12346target67895",
        "sender": {
            "id": 12346,
            "name": "John"
        },
        "receiver": {
            "id": 67895,
            "name": "Sophia"
        },
        "message": [
            {
                "content": "Message 1 from John to Sophia",
                "sender_name": "John",
                "receiver_name": "Sophia",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12347target67896",
        "sender": {
            "id": 12347,
            "name": "Alex"
        },
        "receiver": {
            "id": 67896,
            "name": "Emma"
        },
        "message": [
            {
                "content": "Message 1 from Alex to Emma",
                "sender_name": "Alex",
                "receiver_name": "Emma",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12345target67897",
        "sender": {
            "id": 12345,
            "name": "Hari"
        },
        "receiver": {
            "id": 67897,
            "name": "Olivia"
        },
        "message": [
            {
                "content": "Message 1 from Hari to Olivia",
                "sender_name": "Hari",
                "receiver_name": "Olivia",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12350target67898",
        "sender": {
            "id": 12350,
            "name": "Michael"
        },
        "receiver": {
            "id": 67898,
            "name": "Lily"
        },
        "message": [
            {
                "content": "Message 1 from Michael to Lily",
                "sender_name": "Michael",
                "receiver_name": "Lily",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    },
    {
        "conversation_id": "12351target67899",
        "sender": {
            "id": 12351,
            "name": "Charlie"
        },
        "receiver": {
            "id": 67899,
            "name": "Isabella"
        },
        "message": [
            {
                "content": "Message 1 from Charlie to Isabella",
                "sender_name": "Charlie",
                "receiver_name": "Isabella",
                "timestamp": "2025-02-01T10:00:00Z"
            }
        ]
    }
]


export default function JBMessages(){
    const user_id = "12345";
    const [search, setSearch] = useState('')
    //exp
    const [conversation, setConverstaion] = useState(cnv_api);

    useEffect(()=>{
        const createSocketIO = async()=>{
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
        }

        const getConversation = async()=>{
            const conversations = await axios.post(
                'http://localhost:3000/js/Messages/getConversation',
                {
                    user_uuid : user_id
                },
                {
                    headers : {
                        'Content-Type' : "application/json"
                    }
                }
            )
            setConverstaion(conversations.data);
        }

        async function init(){
            await createSocketIO();
            await getConversation();
        }

        // init().catch(/*doing nothing */)

    },[])

    const fetchMessage = async(sender,receiver)=>{
         const msg = await axios.post('http://localhost:3000/js/Messages/getCnvWithConversationId',{
             data : {
                 sender : sender,
                 receiver : receiver
             },
             headers : {
                 'Content-Type' : 'application/json'
             }
         })
    }

    return<>
        <div className="chat-window">
            <div className="chat-window-sidebar">
                <div className='chat-input-field'>
                    <input type='text' placeholder='Search User' value={search} onChange={(e)=>setSearch(e.target.value)} />
                </div>
                <div className="chat-window-sidebar-users">
                    {
                        conversation.length > 0 ?
                            <div>
                                {
                                    conversation?.map((cnv,index)=>{
                                        const [sender_id,_] = cnv.conversation_id.split('target');
                                        let receiver;
                                        const user = (() => {
                                            if (sender_id === user_id) {
                                                receiver = cnv.receiver.id; // side effect
                                                return cnv.receiver.name;
                                            } else if (sender_id === cnv.receiver.id) {
                                                receiver = sender_id;
                                                return cnv.sender.name;
                                            } else {
                                                return null;
                                            }
                                        })();
                                        return user && user.toLowerCase().startsWith(search.toLowerCase()) ? <div key={index} className='receiver-tag'
                                        onClick={()=>fetchMessage(user_id,receiver)}>
                                            {user}
                                        </div> : null
                                    })
                                }
                            </div> : null
                    }
                </div>
            </div>
            <div className="chat-window-user-chat">

            </div>
        </div>
    </>
}