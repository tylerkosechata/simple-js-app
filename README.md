Project description:

The code provided is a JavaScript program that is responsible for creating a Pokédex web application. It uses an API(see below) to fetch a list of Pokémon and their details, and then displays them on the web page. The code defines a IIFE function called pokemonRepository() that encapsulates the list of Pokémon and provides methods to add new Pokémon, retrieve the full list and load Pokémon details from the API.

The addListItem() method dynamically creates a list of Pokémon on the web page and adds a button for each Pokémon to show more details. The loadList() method fetches the Pokémon list from the API, and the loadDetails method fetches additional details for each Pokémon, such as its image, height and type.

Lastly, the showDetails() method displays the Pokémon's details in a modal(Bootstrap component) when the corresponding button is clicked. This modal includes the Pokémon's image, name, height and type.

Overall, the code uses JavaScript to create a dynamic and interactive web application that allows users to browse and view details of different Pokémon.

How to get the project running:

The App is built with HTML, JS, Jquery, CSS and uses Bootstrap Components

Project dependencies:

CSS:

JS: <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

and Popper: <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>

jQuery: <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>

EsLint Code formatter

*API Url the project uses: "https://pokeapi.co/api/v2/pokemon/"