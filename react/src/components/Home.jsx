import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

const Home = () => {
    const [characters, setCharacters] = useState(null);
    const navigate = useNavigate();
    const handleClick = (id) =>{
        navigate(`/characters?id=${id}`)
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/characters")
          .then(res => res.json())
          .then(data => setCharacters(data))
          .catch(err => console.error(err));
      }, [])

      const filterCharacters = () => {
        return;
      }

    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" onInput={filterCharacters} autoComplete="off" />
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