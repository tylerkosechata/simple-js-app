// height is in m

let pokemonList = [
        {
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
        }
    ];

    for (let i=0; i < pokemonList; i++){
        if (pokemonList[i].height >1.5){
          console.log(pokemonList[i].name + " Wow that's big!!!");
        }
      }