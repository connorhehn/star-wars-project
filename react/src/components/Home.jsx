import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [allCharacters, setAllCharacters] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/characters/${id}`)
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/characters")
            .then(res => res.json())
            .then((data) => {
                setCharacters(data);
                setAllCharacters(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchString((_value) => value);
        if (value === '') {
            setCharacters(allCharacters);
        } else {
            const re = new RegExp(searchString, "i");
            const matchingCharacters = allCharacters.filter(character => re.test(character.name));
            setCharacters(matchingCharacters);
        }
    };

    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" onChange={handleChange} autoComplete="off" value={searchString} />
            </div>
            <section id="charactersList">
                {
                    characters?.map((character) => {
                        return <div key={character.id} onClick={() => handleClick(character.id)}>{character.name}</div>
                    })
                }
            </section>
        </>
    );
}

export default Home;