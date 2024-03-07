let pokemonRepository = (function (){
  let i = 0;
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

  // Add a Pokemon Item to a list      
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon &&
    'detailsUrl' in pokemon
    ) {
        pokemonList.push(pokemon);
    } else {
        console.log('Pokemon is not correct')
    }
  }

  // Return an Array of pokemons
  function getAll() {
    return pokemonList;
  } 
  
  // Function to filter pokemons by name
  function filterByName(name) {
    let containerElement = document.querySelector('.row');
    let pokemonNames = pokemonList.map(item => item.name);

    pokemonNames.forEach((element) => {
        let containerChild = document.querySelector(`[id=${element}]`);
        if (containerChild) {
         if (!element.match(name)) {
           containerElement.removeChild(containerChild);
         }
        }
    });
}

  // Create Pokemon Buttons List  
  function addListItem(pokemon) {
    let pokemonAddList = document.querySelector('.row');
    let divElement = document.createElement('div');
    pokemonAddList.appendChild(divElement);
    divElement.classList.add('list-group-item','col-12','col-sm-6','col-md-4','col-lg-4');
    divElement.id = pokemon.name;

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute('data-id', i++);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');  
    divElement.appendChild(button);
    button.classList.add('btn','btn-lg','btn-block', 'list-btn');
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
        // Fetche Pokemon Item Details
        item.imgUrl = details.sprites.front_default;
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

  return{
    add:add,
    getAll: getAll,
    addListItem: addListItem,
    filterByName:filterByName,
    loadList: loadList,
    loadDetails: loadDetails
  };
  })();

  // Print the list of Pokemon Names and open Modal
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });