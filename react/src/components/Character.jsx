import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/characters/${id}`)
        .then(res => res.json())
        .then(data => setCharacter(data))
        .catch(err => console.error(err))
    }, [id])

    return (
        <>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height"></span> cm</p>
                <p>Mass: <span id="mass"></span> kg</p>
                <p>Born: <span id="birth_year"></span></p>
            </section>
            <section id="species">
                <h2>Species</h2>
                <p><span id="species"></span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><span id="homeworld"></span></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul></ul>
            </section>
        </>
    )
}

export default Character;
