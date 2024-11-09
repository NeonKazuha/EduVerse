// src/Component/PresenterContentbox.js
import React, { useState } from 'react';
import PresenterSwitchPanel from './PresenterSwitchPanel';
import UploadModel from '../Pages/UploadModel';
import MaterialUploader from '../Pages/MaterialUploader';
import AskQuestion from './AskQuestion';
import SessionList from './SessionList'; // Import the SessionList component

const PresenterContentbox = () => {
  const [activeForm, setActiveForm] = useState('form1');

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'form1':
        return <UploadModel />;
      case 'form2':
        return <MaterialUploader />;
      case 'form3':
        return <AskQuestion />;
      case 'session': // Add a case for the new session tab
        return <SessionList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex py-1 justify-center bg-transparent absolute -right-28 items-center h-screen z-40 scale-75">
      <div className="bg-transparent shadow-lg rounded-lg w-[33rem] h-96 scale-75 overflow-hidden">
        <PresenterSwitchPanel setActiveForm={setActiveForm} />
        <div className="overflow-y-auto h-full w-[25rem] bg-transparent">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  );
};

export default PresenterContentbox;