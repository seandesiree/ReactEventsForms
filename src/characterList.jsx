
import CharacterDetails from './CharacterDetail';
import axios from "axios";
import {useState, useEffect} from 'react';


const CharacterList = () => {
    const [characters, setCharacters] = useState([])
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('https://gateway.marvel.com/v1/public/characters/?&ts=1&apikey=1d89a4cd079ab160427ebb9a0ab5274f0&Hash7aecc47122f718203aa811e81433582b');
                setCharacters(response.data.data.results)
                
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        
        fetchCharacters();
    }, []);
    
    const selectCharacter = (id) => {
        setSelectedId(id);
        
    }

    return (
        
        <div>
            <h3>Marvel Characters</h3>
            <ul>
                {characters.map( character => (
                    <li key={character.id}>
                        {character.name}
                        <br />
                        <img onClick={() => selectCharacter(character.id)} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} width="200"/>
                        {selectedId && character.id === selectedId && <CharacterDetails characterId={selectedId} />}
                    </li>
                ))}
            </ul>

        </div>
    )

}

export default CharacterList;
