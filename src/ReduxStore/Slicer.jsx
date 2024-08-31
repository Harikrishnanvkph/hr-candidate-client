import {createSlice} from '@reduxjs/toolkit'

const myData = {
    userCE : null,
    secret : null,
    toastMessage : ""
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
        }
    }
})

export const {addUser,setSecret,toastMessage} = slicer.actions;

export default slicer.reducer;