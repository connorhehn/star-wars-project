import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Planet = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [characters, setCharacters] = useState([]);
    const [planet, setPlanet] = useState({});
    const [films, setFilms] = useState([]);

    const fetchPlanet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${id}`);
            const json_response = await response.json();
            setPlanet(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchCharacters = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${id}/characters`);
            const json_response = await response.json();
            setCharacters(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchFilms = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${id}/films`);
            const json_response = await response.json();
            setFilms(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        fetchPlanet();
        fetchCharacters();
        fetchFilms();
    }, [id]);

    const handleCharacterClick = (id) => {
        navigate(`/characters/${id}`);
    };

    const handleFilmClick = (id) => {
        navigate(`/films/${id}`);
    };

    return (
        <>
            <h1 id="name">{planet?.name}</h1>
            <section id="generalInfo">
                <p>Climate: {planet?.climate}</p>
                <p>Terrain: {planet?.terrain}</p>
                <p>Population: {planet?.population}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films?.map(film => {
                        return (
                            <li key={film.id}>
                                <a onClick={() => handleFilmClick(film?.id)}>{film?.title}</a>
                            </li>
                        )
                    })
                    }
                </ul>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {characters?.map(character => {
                        return (
                            <li key={character.id}>
                                <a onClick={() => handleCharacterClick(character?.id)}>{character?.name}</a>
                            </li>
                        )
                    })
                    }
                </ul>
            </section>
        </>
    )
};

export default Planet;