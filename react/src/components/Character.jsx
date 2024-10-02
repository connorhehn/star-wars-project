import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [planet, setPlanet] = useState({});
    const [films, setFilms] = useState([]);

    const fetchCharacter = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/characters/${id}`);
            const json_response = await response.json();
            setCharacter(json_response);
            fetchPlanet(json_response.homeworld);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchPlanet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${id}`);
            const json_response = await response.json();
            setPlanet(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchFilms = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/characters/${id}/films`);
            const json_response = await response.json();
            setFilms(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        fetchCharacter();
        fetchFilms();
    }, [id]);

    return (
        <>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: {character?.height} cm</p>
                <p>Mass: {character?.mass} kg</p>
                <p>Born: {character?.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>{planet?.name}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <div>
                    {films?.map(film => {
                        return (
                            <div>
                                {film.title}
                            </div>
                        )
                    })
                    }
                </div>
            </section>
        </>
    )
}

export default Character;
