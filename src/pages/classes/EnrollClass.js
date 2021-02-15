import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';

const EnrollClass = () => {
    const { enrollClass } = useData();

    useEffect = () => {
        // redirect user if not signed in
    }

    const handleSubmit = () => {
        // enroll the user into a class and then redirect them to the class
    }

    return (
        <>
            {/* Form for enrolling a user into a class */}
        </>
    )
}

return EnrollClass;