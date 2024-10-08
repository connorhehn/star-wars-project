import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Film = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);

    const fetchFilm = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}`);
            const json_response = await response.json();
            setFilm(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchCharacters = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}/characters`);
            const json_response = await response.json();
            setCharacters(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    const fetchPlanets = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/films/${id}/planets`);
            const json_response = await response.json();
            setPlanets(json_response);
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        fetchFilm();
        fetchCharacters();
        fetchPlanets();
    }, [id]);

    const handlePlanetClick = (id) => {
        navigate(`/planets/${id}`)
    }

    const handleCharacterClick = (id) => {
        navigate(`/characters/${id}`)
    }

    const handleHomeclick = () => {
        navigate('/');
    }

    return (
        <>
            <h1 id="name">{film?.title}</h1>
            <section id="generalInfo">
                <p><span id="filmDirector">Director: {film?.director}</span></p>
                <p><span id="filmReleaseDate">Release Date: {film?.release_date}</span></p>
                <p><span id="filmEpisode">Episode: {film?.episode_id}</span></p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul id="charactersList">
                    {characters?.map((c) => {
                        return (
                            <li key={c.id}>
                                <a onClick={() => handleCharacterClick(c.id)}>
                                    {c.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul id="planetsList">
                    {planets?.map((p) => {
                        return (
                            <li key={p.id}>
                                <a onClick={() => handlePlanetClick(p.id)}>
                                    {p.name}
                                </a>
                            </li>
                        );
                    })}
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

export default Film;
