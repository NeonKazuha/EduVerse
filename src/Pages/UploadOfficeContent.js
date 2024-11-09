import React from 'react'
import FormNavbar from '../Component/FormNavbar';
import { useState } from 'react';
import UploadAssignment from './UploadAssignment';
import UploadMaterial from './UploadMaterial';
import UploadModel from './UploadModel';
import OfficeContentNavbar from '../Component/OfficeContentNavbar';
import UploadOfficeMaterial from './UploadOfficeMaterial';
import UploadOfficeModel from './UploadOfficeModel';
const UploadOfficeContent = () => {
    const [activeForm, setActiveForm] = useState('form1');

    const renderActiveForm = () => {
        switch (activeForm) {
            case 'form1':
                return <UploadOfficeMaterial />;
            case 'form2':
                return <UploadOfficeModel />;
          
           
            default:
                return <UploadOfficeMaterial />;
        }
    };
    return (
        <>
            <div className="container mx-auto flex flex-col gap-3">
                <OfficeContentNavbar setActiveForm={setActiveForm} />
                {renderActiveForm()}
            </div>
        </>

    )

}

export default UploadOfficeContent