import axios from "axios";

const baseUrl = "https://hr-candidate-server.onrender.com";

async function login(loginData){
    const result = await axios.post(`${baseUrl}/login`,loginData);
    return result.data;
}

async function register(registerData){
    const result = await axios.post(`${baseUrl}/register`,registerData);
    return result.data;
}

async function getUserDetail(mail){
    try{
        const user = await axios({
            method : "post",
            url : `${baseUrl}/user`,
            data : {
                mail : mail
            }
        })
        return user.data;
    }catch(error){
        console.log(error);
        return null;
    }
    
}

async function updatePhoneNumber(number,mail){
    const numUpdate = await axios.post(
        `${baseUrl}/update/phN`,
        {
            phone_number : number,
            mail : mail
        }
    )
    return numUpdate.data;
}
async function updateSkiller(skill,mail){
    const numUpdate = await axios.post(
        `${baseUrl}/update/pSkill`,
        {
            primary_skill : skill,
            mail : mail
        }
    )
    console.log(numUpdate.data)
    return numUpdate.data;
}

async function uploadImage(formData){
    const fd = await axios.post(
        `${baseUrl}/update/pImage`,
        formData,
        {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }
    )
    return fd.data;
}

async function createChatID(currentUser,selectedUser){
    const chatIdStatus = await axios.post(
        `${baseUrl}/update/create/ChatID`,
        {
            currentUserMail : currentUser.mail,
            selectedUserMail : selectedUser.mail
        }
    )
    return chatIdStatus;
}

async function getReferral(){
    const referral = await axios.get(
        `${baseUrl}/referral`
    )
    return referral.data;
}

async function updateReferral(mail,referral){
    const ref = await axios.post(
        `${baseUrl}/update/referral`,
        {
            mail : mail,
            referral : referral
        }
    )
    return ref;
}

async function getService(){
    const referral = await axios.get(
        `${baseUrl}/service`
    )
    return referral.data;
}

async function updateService(mail,service){
    const referral = await axios.post(
        `${baseUrl}/update/service`,
        {
            mail : mail,
            service : service
        }
    )
    return referral;
}

async function getMyReferral(mail){
    const referral = await axios.post(
        `${baseUrl}/myreferral`,
        {mail : mail}
    )
    return referral.data;
}

async function getMyService(mail){
    const referral = await axios.post(
        `${baseUrl}/myservices`,
        {mail : mail}
    )
    return referral.data;
}


export {login,register,getUserDetail,updatePhoneNumber,
    updateSkiller,uploadImage, createChatID,getReferral,getService,
    updateReferral, updateService,getMyReferral,getMyService}
