
const Character = () => {
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id');
    return (
        <>
        <div>Character page for id: {id}</div>
        </>
    )
}

export default Character;
