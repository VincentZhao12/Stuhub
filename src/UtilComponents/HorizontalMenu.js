import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const HorizontalMenu = (props) => {
    const elements = props.elements ? props.elements : [];
    const numDisplay = props.display;
    const [displayStart, setDisplayStart] = useState(0);
    const [displayEnd, setDisplayEnd] = useState(numDisplay);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => window.addEventListener('resize', () => setWindowWidth(window.innerWidth)), []);

    return (
        <>
            <Button variant="custom-secondary" onClick={() => {setDisplayStart(displayStart - 1); setDisplayEnd(displayEnd - 1)}} disabled={displayStart === 0}>{"<"}</Button>
            {elements.map((element, index) => {
                if(index >= displayStart && index < displayEnd)
                    return <div style={{width: "20%"}}>{element}</div>;
                return <></>;
            })}
            <Button variant="custom-secondary" onClick={() => {setDisplayStart(displayStart + 1); setDisplayEnd(displayEnd + 1)}} disabled={displayEnd >= elements.length}>{">"}</Button>
        </>
    );
}

export default HorizontalMenu;