window.onload = () => {

   const qs = (search)=>{
       return document.querySelector(search)
   }

   

   fetch("http://localhost:3031/api/movies")
   .then(response=>response.json())
   .then(movies=>{

        /* inputs */
        const title = qs("#title");
        const rating = qs("#rating");
        const awards = qs("#awards");
        const release_date = qs("#release_date");
        const length = qs("#length");

        /* buttons */
        const editar = qs(".editar")
        const crear = qs(".crear")
        const eliminar = qs(".eliminar")
        
        let movie;
        let find;

        title.addEventListener("input", (e)=>{
            movie = e.target.value

            find = movies.data.find(e=>e.title.toLowerCase() === movie.toLowerCase())

            console.log(find);
            
            //Si el título ingresado coincide con una película en la base de datos, el formulario se completa
            if(find !== undefined ){
                rating.setAttribute("value", find.rating)
                awards.setAttribute("value", find.awards)
                const date = find.release_date.split("T")[0]
                release_date.setAttribute("value", date)
                length.setAttribute("value", find.length)
            }
        })
  
        editar.addEventListener("click", (e)=>{
            e.preventDefault();

            if(find !== undefined){

                const body = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                    genre_id: find.genre.id
                }
                
                //Edición de una película
                fetch("http://localhost:3031/api/movies/update/"+find.id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                .then(response=>response.json())
                .then(result=>{
                    console.log(result)
                    const resultado = document.createElement('h2')
                    const body = qs('body')
                    resultado.innerText = "Se editó la película correctamente"
                    body.appendChild(resultado)
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        })

        //Creación de una película
        crear.addEventListener("click", e=>{
            e.preventDefault();

            const body = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: null
            }

            fetch("http://localhost:3031/api/movies/create", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
            .then(response=>response.json())
            .then(response=>{
                console.log(response);
                const resultado = document.createElement('h2')
                const body = qs('body')
                resultado.innerText = "Se creó la película correctamente"
                body.appendChild(resultado)
            })
            .catch(error=>{
                console.log(error);
            })
        })

        //Eliminación de una película
        eliminar.addEventListener("click", e=>{
            e.preventDefault();

            fetch("http://localhost:3031/api/movies/delete/"+find.id, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                    /* No hace falta enviar un body */
            })
            .then(response=>response.json())
            .then(response=>{
                console.log(response);
                const resultado = document.createElement('h2')
                const body = qs('body')
                resultado.innerText = "Se eliminó la película correctamente"
                body.appendChild(resultado)
            })
        })


   })
   .catch(error=>{
       console.log(error);
   })
}