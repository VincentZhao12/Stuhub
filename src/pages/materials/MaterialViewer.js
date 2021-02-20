import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Container } from 'react-bootstrap';
import FileViewer from 'react-file-viewer';

const MaterialViewer = ({ match }) => {
    const { currentClass, materialData } = useData();
    const { currentUser } = useAuth();
    const materialId = match.params.material;
    const [materialLink, setMaterialLink] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [materialDesc, setMaterialDesc] = useState("");
    const [fileType, setFileType] = useState("");
    const history = useHistory();

    useEffect(() => {
        // update classes and then set the material data
        const material = materialData[materialId];
        console.log("material", material);
        if(!currentClass|| !currentUser || !material)
            history.push("/");
        else {
            setMaterialLink(material.url);
            setMaterialName(material.name);
            setMaterialDesc(material.description);
            setFileType(material.type);

            console.log(material.url);
        }
    }, []);

    return (
        <Container className="justify-content-center">
            {/* Video player to play lecture with title and description */}
            <h2>{materialName}</h2>
            <p>{materialDesc}</p>
            {fileType.includes("pdf") ? 
                <iframe src={materialLink} scrolling="auto" height="500" width="900" /> : 
                    fileType.includes("image") ? 
                        <img src={materialLink} width="500" /> : 
                            <a href={materialLink} target="_blank">{"Download " + materialName}</a>}
            
        </Container>
    )
}

export default MaterialViewer;