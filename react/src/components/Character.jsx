import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Character = () => {
    const navigate = useNavigate();
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

    const fetchPlanet = async (planet_id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/planets/${planet_id}`);
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

    const handlePlanetClick = (id) => {
        navigate(`/planets/${id}`)
    }
    const handleFilmClick = (id) => {
        navigate(`/films/${id}`)
    }

    const handleHomeclick = () => {
        navigate('/');
    }
    
    return (
        <>
            <h1 id="name">{character?.name || 'Loading...'}</h1>
            <section id="generalInfo">
                <p>Height: {character?.height} cm</p>
                <p>Mass: {character?.mass} kg</p>
                <p>Born: {character?.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>{ planet?.id ? (
                    <a onClick={() => handlePlanetClick(planet?.id)}>{planet?.name}</a>
                ) : <a> Loading...</a>
                    }
                </p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films?.map(film => {
                        return (
                            <li key={film.id}>
                                <a onClick={() => handleFilmClick(film.id)}>
                                    {film.title}
                                </a>
                            </li>
                        )
                    })
                    }
                </ul>
            </section>
            <section id="home">
                <h1>Return Home</h1>
                <p>
                <a onClick={() => handleHomeclick()}>Home</a>
                </p>
            </section>
        </>
    )
}

export default Character;
