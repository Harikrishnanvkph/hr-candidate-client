import AdbIcon from '@mui/icons-material/Adb';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import "./JS.css"
import { Route, Routes, useNavigate } from 'react-router-dom';
import JBProfile from './JBProfile';
import JBHelp from './JBHelp';
import JBMessages from './JBMessages';
import { useDispatch, useSelector } from 'react-redux';
import JBReferral from './JBReferral';
import JBServices from './JBServices';
import { useEffect } from 'react';
import { Bounce, ToastContainer,toast } from "react-toastify";
import { toastMessage } from "../ReduxStore/Slicer";
import { MyReferrals } from './MyReferrals';
import { MyServices } from './MyServices';



const iconC = <>
  <JBICON icon={<AccountBoxIcon className='jb-icon m-2' />} name="Profile" />
  <JBICON icon={<HistoryEduIcon className='jb-icon m-2' />} name="Referral" />
  <JBICON icon={<DesignServicesIcon className='jb-icon m-2' />} name="Services" />
  <JBICON icon={<QuestionAnswerIcon className='jb-icon m-2' />} name="Messages" />
  <JBICON icon={<HelpIcon className='jb-icon m-2' />} name="Help" />
</>

const routes = <>
  <Routes>
    <Route element={<JBProfile />} path='/' />
    <Route element={<JBReferral />} path='Referral' />
    <Route element={<JBServices />} path='Services' />
    <Route element={<JBMessages />} path='Messages' />
    <Route element={<JBHelp />} path='Help' />
    <Route path="Referral/myReferrals" element={<MyReferrals />} />
    <Route path="Services/myServices" element={<MyServices />} />
  </Routes>
</>

export function JSHome() {
  const currentUser = useSelector((state)=>state.myStore.userCE);
  const toastT = useSelector((state)=>state.myStore.toastMessage);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(toastT != ""){
      toast.success(toastT, {
          position: "top-center",
          autoClose: 1000, // Auto close after 1 second
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
      })
      dispatch(toastMessage(""));
    }
  },[toastT])
  
  return (
    <>
      <div className="container-fluid job-seeker p-0 d-flex flex-column">
        <nav className='row jb-nav d-flex justify-content-between p-3 m-0'>
          <div className="d-flex justify-content-md-end justify-content-sm-center justify-content-center align-items-center">
            <AdbIcon className="mx-1 nav-logo" fontSize="large" />
            <h5 className="m-0">Hari HR Recruit App</h5>
          </div>
          <div className='profile-div d-flex align-items-center'>
            <div className='d-sm-flex d-none align-items-center jb-title'>
              <div className='circle'></div>
              <p className='m-0'><strong>Candidate</strong></p>
            </div>
            <button className='profile-div-button mx-2 mr-4'>
              <span role="img" className='profile-div-button-span'>
                <img className="profile-div-button-span-img" src={
                  `${currentUser.image.data == "" || currentUser.image.data == null ? '/defaultProfile.jpg' : `data:image/png;base64,${currentUser.image.data}`}`
                } alt={`profile picture of ${currentUser.firstName}`} />
              </span>
            </button>
          </div>
        </nav>
        <div className='row jb-body d-sm-flex d-none m-0 p-0'>
          <div className='col-12 m-0 p-0 d-flex jb-laptop'>
            <div className='jb-menu p-0 d-flex flex-column px-4'>
              {iconC}
            </div>
            <div className='jb-section p-md-2 p-0'>
              {routes}
            </div>
          </div>
        </div>
        <div className='row d-sm-none d-flex p-0 m-0 jb-mobile'>
          <div className='col-12 d-flex flex-column jb-body-mobile m-0 p-0 justify-content-between'>
            <div className='jb-section-mobile p-sm-3 p-0 d-flex flex-grow-1 justify-content-center'>
              {routes}
            </div>
            <div className='jb-menu-mobile p-md-3 py-2 d-flex justify-content-around'>
              {iconC}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer style={{zIndex : "1000"}} />
    </>
  );
}


function JBICON({icon, name}){
  const navigate = useNavigate();
  return <>
    <div onClick={()=>navigate(name == "Profile" ? "" : name)} className={`${name} jbicon d-flex flex-md-row flex-column align-items-center justify-content-md-auto justify-content-center flex-grow-1 flex-shrink-1`}>
      <div className='col-lg-5 col-md-4 text-center p-sm-auto p-0'>
         {icon}
      </div>
      <p className='jb-p col-md-8 m-0 p-sm-auto p-0'>{name}</p>
    </div>
  </>
}
