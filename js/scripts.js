let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
      
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
      
  function getAll() {
     return pokemonList;
    }
      
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height);
    });
  }
    
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
    }

      function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
      
      
        function loadDetails(item) {
          let url = item.detailsUrl;
          return fetch(url).then(function (response) {
            return response.json();
          }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
          }).catch(function (e) {
            console.error(e);
          });
        }

        function showDetails(pokemon) {
          loadDetails(pokemon).then(function () {
            console.log(pokemon);
          });
        }
      
        return {
          add: add,
          getAll: getAll,
          loadList: loadList,
          loadDetails: loadDetails
        };
      
        pokemonRepository.loadList().then(function() {
          // Now the data is loaded!
          pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
          });
        });
      });