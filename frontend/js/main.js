window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  fetch("http://localhost:3031/api/movies")
  .then(response=>response.json())
  .then(peliculas=>{

    let data = peliculas.data;

    if(!localStorage.getItem("favoritas")){
      let favoritas = []
      localStorage.setItem("favoritas", JSON.stringify(favoritas))
    }

    //Creamos una tarjeta para cada película
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      //Si no tiene género, no lo muestra
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }

      //Si no tiene duración, no lo muestra
      if (movie.length !== null) {
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
        card.appendChild(duracion);
      }

      /* Películas favoritas */
      const button = document.createElement("button");
      button.innerText = "Favorita";
      button.classList.add("botonAgregar")
      card.appendChild(button);
      button.setAttribute("id", movie.id)

      if(JSON.parse(localStorage.getItem('favoritas')).find(favorita => favorita.id === movie.id)) {
        button.style.backgroundImage = 'none'
        button.style.backgroundColor = 'gray'
      }

      //Al presionar el botón, la película se agrega o se quita de localStorage
      button.addEventListener("click", e=>{

        e.preventDefault();

         let favoritas = JSON.parse(localStorage.getItem("favoritas"))

        if(!favoritas.find(favorita => favorita.id === parseInt(e.target.id))) {

          favoritas.push(movie);
          button.style.backgroundImage = "none"
          button.style.backgroundColor = 'gray'

        } else {

          favoritas = favoritas.filter(favorita => favorita.id !== parseInt(e.target.id))
          button.style.backgroundImage = "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)"
          button.style.backgroundColor = "none"
        }

        localStorage.setItem('favoritas', JSON.stringify(favoritas))
      })

    });
  })

};
