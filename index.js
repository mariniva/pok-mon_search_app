const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');


const toValidName = (name) => {
  const validName = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  return validName
}

const displayPokemon = (data) =>{
  const {name,id,weight,height,sprites,types,stats} = data;
  
  document.getElementById('pokemon-name').textContent = name.toUpperCase();
  document.getElementById('pokemon-id').textContent = `#${id}`;
  document.getElementById('weight').textContent = `Weight: ${weight}`;
  document.getElementById('height').textContent = `Height: ${height}`;
  document.getElementById('sprite').src = sprites['front_default'];
  document.getElementById('types').innerHTML = '';
  types.forEach(type=>{
    document.getElementById('types').innerHTML += `
      <span class="type ${type['type']['name']}">${type['type']['name']}</span>
    `
  })

stats.forEach(({base_stat,stat})=>{
  document.getElementById(stat['name']).textContent = base_stat;

})


}
const getPokemon = async(nameOrId) =>{
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
    const data = await res.json();
    console.log(data)
    displayPokemon(data);
  } catch (err) {
    return alert("Pokémon not found");
  }
}

const search = () => {
  const nameOrId = toValidName(searchInput.value);
  getPokemon(nameOrId);
  
}

searchBtn.addEventListener("click",search);
searchInput.addEventListener("keydown",(e)=>{
  if (e.key=="Enter"){
    search()
  }})