import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const UploadMaterial = () => {
    const { currentUser } = useAuth();
    const { createMaterial, currentClass, classData, updateClassData } = useData();
    const history = useHistory();

    useEffect(() => {
        // update classData, then if the current user is not the creator of the class, return to homepage
    }, []);

    return (
        <>
            {/* Form to upload the material */}
        </>
    )
}

export default UploadMaterial;