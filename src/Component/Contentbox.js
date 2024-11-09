import React from 'react'
import FormNavbar from './FormNavbar';
import AssignmentBox from './AssignmentBox';
import { useState } from 'react';
import Switchpanel from './Switchpanel';
import MaterialBox from './MaterialBox';
import ModelBox from './ModelBox';
const Contentbox = () => {
    const [activeForm, setActiveForm] = useState('form1');
    const renderActiveForm = () => {
        switch (activeForm) {
            case 'form1':
                return <AssignmentBox />;
            case 'form2':
                return <MaterialBox />;
            case 'form3':
                return <ModelBox />
            case 'form4':
                return null    
            // Add cases for other forms
            default:
                return null
        }
    };
    return (<>
        <Switchpanel setActiveForm={setActiveForm} />
        {renderActiveForm()}
    </>
    )
}

export default Contentbox