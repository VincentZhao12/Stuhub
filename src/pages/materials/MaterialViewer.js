import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';

const MaterialViewer = ({ match }) => {
    const { currentClass, classData, updateClasses } = useDatas();
    const materialId = match.params.material;
    const [materialLink, setMaterialLink] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [materialDesc, setMaterialDesc] = useState("");

    useEffect(() => {
        // update classes and then set the material data
    }, []);

    return (
        <>
            {/* Page to display material name, download link, and description */}
        </>
    )
}

export default LectureViewer;