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
        }

        fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                // Here's where you get access to the blob
                // And you can use it for whatever you want
                // Like calling ref().put(blob)

                // Here, I use it to make an image appear on the page
                let objectURL = URL.createObjectURL(blob);
                let material = new File([""], "material.name");
                material.src = objectURL;
                setFileType(material.type);
});
    }, []);

    return (
        <Container className="justify-content-center">
            {/* Video player to play lecture with title and description */}
            <h2>{materialName}</h2>
            <FileViewer 
                filePath={materialLink}
                fileType={fileType}
                />
            <p>{materialDesc}</p>
        </Container>
    )
}

export default MaterialViewer;