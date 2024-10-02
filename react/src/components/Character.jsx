import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Character = () => {
    const {id} = useParams();
    
    return (
        <>
        <div>Character page for id: {id}</div>
        </>
    )
}

export default Character;
