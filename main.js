/////ejercicio 1.1
fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => response.json())
.then(respJSON=>{
    console.log('respuesta usuariosJSON : ', respJSON)
    for(index = 0; index <5; index++){
        console.log('respuesta usuarios : ', respJSON[index].name)
    }
    
})
.catch(error=>console.error('error:', error))







function inyectarUsuarios (){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(resp => resp.json())
  .then(respJSON => {
      const divtable = document.querySelector('.divtable');
      const creatediv = document.createElement("div");
  let tablaHTML = `
  <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>`
        
          for(index = 0; index < 5; index ++){
            
          tablaHTML +=`
          <tr>
            <th onclick="mostrarDatosUsuario(${respJSON[index].id})" scope="row">${respJSON[index].id}</th>
            <td>${respJSON[index].name}</td>
            <td>${respJSON[index].username}</td>
            <td>${respJSON[index].email}</td>
          </tr>
          `
          
          }
          tablaHTML +=`
        </tbody>
      </table>
  `
             
      creatediv.innerHTML = tablaHTML
      divtable.appendChild(creatediv)
    
  }
   
)}



// function recibeid (userid){
//   fetch(`https://jsonplaceholder.typicode.com/users/${userid}`)
// }


function mostrarDatosUsuario(userId) {
// Limpiar la ficha de usuario antes de mostrar los nuevos datos
const fichaUsuario = document.querySelector('.card');
fichaUsuario.innerHTML = '';


fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then(resp => resp.json())
.then(usuario => {
  // const fichaUsuario = document.querySelector('.card');
  const creatediv = document.createElement("div");
  let tablaHTML =`
    <h5 class="card-title">${usuario.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Datos</h6>
      <p><strong>Infor: </strong> ${usuario.name}</p>
      <p><strong>Infor: </strong> ${usuario.email}</p>
      <a href="#" class="card-link">Página web</a>;
  `
  creatediv.innerHTML = tablaHTML
  fichaUsuario.appendChild(creatediv)
  inyectarPost(userId);
  
})
}

// mostrarDatosUsuario(userId) No hace falta llamar a la función porque con el onclick ya lo llamo.


function inyectarPost (userId){
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)//El ? empieza una consulta, lo siguiente es que pillamos los posts de cada idusuario diferente.
.then(resp => resp.json())
.then(posts => {
  const divposts = document.querySelector('.divposts')
  divposts.innerHTML=''; // Limpiar el contenido anterior

  posts.slice(0, 5).forEach(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    postItem.dataset.postid = post.id; // Almacenar el id del post como atributo de datos
    postItem.innerHTML = `
        <div class="ms-2 me-auto">
            <div class="fw-bold">${post.title}</div>
            ${post.body}
        </div>
        <span class="badge bg-primary rounded-pill">${userId}</span>
    `;
    divposts.appendChild(postItem);

    // Llamar a la función para inyectar comentarios
    comentariosPost(post.id);
});
}); // Aquí se cierra la función then de fetch
}

function comentariosPost(postId){
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  .then(resp => resp.json())
  .then(comments => {
    const divComentariosPost = document.querySelector('.divComentarioPost');
    divComentariosPost.innerHTML="";// Limpiar

    comments.slice(0, 3).forEach(comment => {
      const commentCard = document.createElement('div');
      commentCard.classList.add('card' ,'mt-2');
      commentCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${comment.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${comment.email}</h6>
          <p class="card-text">${comment.body}</p> 
        </div>
      `;
      divComentariosPost.appendChild(commentCard);
    });
  })
  .catch(error => console.error('Error al obtener los comentarios del post:', error));
}


inyectarUsuarios()