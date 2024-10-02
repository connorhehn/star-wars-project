import {useNavigate} from 'react-router-dom'

const Home = (props) => {
    const characters = props.data;
    const navigate = useNavigate();
    const handleClick = (id) =>{
        navigate(`/characters?id=${id}`)
    }
    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label for="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
            </div>
            <section id="charactersList">
                {
                    characters.map((character) => {
                        return <div onClick={() => handleClick(character.id)}>{character.name}</div>
                    })
                }
            </section>
        </>
    );
}

export default Home;