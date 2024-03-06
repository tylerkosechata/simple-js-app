let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }

  // Create Pokemon Buttons List 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  //  Function to fetch the list of Pokemon Items from API
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
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

    // Function to fetch the Pokemon Details from Pokemon Items
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

  // Display a Modal of Pokemon Item Details
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let titleElement = document.querySelector('#titleModal');
      titleElement.textContent = item.name;

      let contentElement = document.querySelector('.modal-body');
      contentElement.innerHTML = ''; // Clear existing content

      let imgElement = document.createElement('img');
      imgElement.src = item.imgUrl;
      imgElement.alt = item.name;
      imgElement.classList.add('img-fluid');
      contentElement.appendChild(imgElement);
      
      let heightItem = document.createElement('p');
      heightItem.textContent = 'Height: ' + item.height + "'";
      contentElement.appendChild(heightItem);
      let titleTypes = document.createElement('span');
      titleElement.classList.add('spanType');
      titleTypes.innerText = 'Type: ';
      
      let containerTypes = document.createElement('div');
      containerTypes.classList.add('type-container', 'container', 'row')
      contentElement.appendChild(containerTypes);
      containerTypes.appendChild(titleTypes);

      item.types.forEach((element) => {
        let typeElement = document.createElement('button');
        typeElement.classList.add('btn-lg', 'type-content');
        typeElement.innerText = element.type.name;
        containerTypes.appendChild(typeElement);
        });
    });
  }

  $('#exampleModal').on('show.bs.modal', function(event) {
    let pokemonID = event.relatedTarget.dataset.id;
    showDetails(pokemonList[pokemonID]);
  });

  $('#searchItem').on('change input', function(event) {
    let inputText = $('#searchItem').val();
    filterByName(inputText);
  });
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Print the list of Pokemon Names and open Modal
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});