import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KeyboardControls } from "@react-three/drei";
import { VRButton } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import Enviroment from "../Pages/Enviroment";
import ArCube from "../AR/ArCube";
import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";
import Item from "../Pages/Item";
import Upload from "../Component/Upload";
import VoiceChat from "../Pages/VoiceChat";
import ProcessML from "../Component/ProcessML";
import AskaiInput from "../Component/AskaiInput";
import MessageBox from "../Component/MessageBox";
import Doubt from "../Component/Doubt";
import DoubtPanel from "../Component/DoubtPanel";
import { SocketManager } from "../Socketmanager";
import UploadAssignment from "../Pages/UploadAssignment";
import UploadClass from "../Pages/UploadClass";
import AssignmentBox from "../Component/AssignmentBox";
import Contentbox from "../Component/Contentbox";
import MenuOffice from "../Component/MenuOffice";
import ShowModel from "../Component/ShowModel";
import ConnectMetamask from "../Pages/ConnectMetamask";
import Landingpage from "../Pages/Landingpage.js";
import TeacherContentbox from "../Component/TeacherContentbox.js";
import SelectiveRenderTeacher from "../Component/SelectiveRenderTeacher.js";

const AppRoutes = () => {
  return (
    <>
      <SocketManager />
      <Router>
        <Routes>
          {/* <Route element={<MessageBox />} path='/vc' />
                    <Route element={<Contentbox />} path='/dc' />
                    <Route element={<AskaiInput/>} path='/ai' />
                    <Route element={<ProcessML />} path='/sc' />
                    <Route element={<ConnectMetamask />} path='/mc' /> */}
          <Route element={<SelectiveRenderTeacher />} path='/test' /> 
          <Route element={<Landingpage />} path="/" />{" "}
          <Route path="/signup" element={<Signup />} />
          <Route element={<Enviroment />} path="/verse" />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/product" element={<Item />} />
          {/* <Route element={<ArCube />}  path='/xr' /> */}
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
