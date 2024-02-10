let pokemonRepository = (function () {
    let pokemonList = [   {
        name: 'Charizard',
        height: 1.7,
        type: ['fire', 'flying']
    },
    {
        name: 'Squirtle',
        height: .5,
        type: ['water']
    },
    {
        name: 'Bulbasaur',
        height: .7,
        type: ['grass', 'posion']
    }];
  
    return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();
  
  console.log(pokemonRepository.getAll()); // []
  pokemonRepository.add({ name: 'Pikachu' });
  console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

  pokemonList.forEach(function(name,height,type) {
    console.log("name: " + name + " height: " + height + " type: " + type);
  })