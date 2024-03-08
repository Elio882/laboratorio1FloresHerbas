import './style.css'
import fetchPokemon from './services/api.js';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonDisplay = document.getElementById('pokemon-display');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();// "    hol   "
    if (!query) return; // No buscar si el input está vacío.
    console.log('test');
    try {
        const pokemon = await fetchPokemon('https://pokeapi.co/api/v2/pokemon/', query);
        displayPokemon(pokemon,"front_default");
    } catch (error) {
        console.error("Error al buscar el Pokémon:", error);
    }
});

const  displayPokemon = (pokemon,spriteType) => {
    pokemonDisplay.innerHTML = '';
    const pokemonName = document.createElement('h2');
    const pokemonMove = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    //pokemon moves
    const{moves} = pokemon;
    const [firstMove] = moves;
    const {move} = firstMove;
    const {name} = move;
    console.log(name);
    pokemonMove.textContent = name ;
    if (pokemon.sprites) {
      const spriteImg = document.createElement('img');
      spriteImg.src = pokemon.sprites[spriteType];
      spriteImg.alt = spriteType; 
      pokemonDisplay.appendChild(spriteImg);
    } else {
      console.error(`No se encontró el sprite "${spriteType}" para este Pokémon.`);
    }
    pokemonDisplay.appendChild(pokemonName);
    pokemonDisplay.appendChild(pokemonMove);
}
