import React from 'react'
import FormNavbar from '../Component/FormNavbar';
import { useState } from 'react';
import UploadAssignment from './UploadAssignment';
import UploadMaterial from './UploadMaterial';
import UploadModel from './UploadModel';
import { Html } from '@react-three/drei';
const UploadClass = () => {
    const [activeForm, setActiveForm] = useState('form1');

    const renderActiveForm = () => {
        switch (activeForm) {
            case 'form1':
                return <UploadAssignment />;
            case 'form2':
                return <UploadMaterial />;
            case 'form3':
                return <UploadModel />;
            // Add cases for other forms
            default:
                return <UploadAssignment />;
        }
    };
    return (

        <Html transform occlude={'blending'} zIndexRange={[10, 1]} position={[67, 2, 0]} rotation-y={(Math.PI) * 3 / 4}
            scale={0.1}  >
            <div className="container  mx-auto flex flex-col gap-3">
                <FormNavbar setActiveForm={setActiveForm} />
                {renderActiveForm()}
            </div>
        </Html>



    )

}

export default UploadClass