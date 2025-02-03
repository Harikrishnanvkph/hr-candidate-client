import {createSlice} from '@reduxjs/toolkit'

const myData = {
    userCE : null,
    secret : null,
    toastMessage : "",
    conversations : []
}


const slicer = createSlice({
    name : "hrSlicer",
    initialState : myData,
    reducers : {
        addUser(state, action){
            console.log(action.type)
            state.userCE = action.payload
        },
        setSecret(state, action){
            state.secret = action.payload;
        },
        toastMessage(state,action){
            state.toastMessage = action.payload;
        },
        addConversation(state, action){
            state.conversations.push(action.payload);
        },
        updateConversation(state, action){
            const {conversation_id, message} = action.payload;
            state.conversations.forEach((cnv,index)=>{
                if(cnv.conversation_id === conversation_id){
                    cnv.messages.push(message)
                }
            })
        }
    }
})

export const {addUser,setSecret,toastMessage,
    addConversation,updateConversation} = slicer.actions;

export default slicer.reducer;