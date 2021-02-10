// // Metodos HTTP

// // GET     leer
// // POST    crear
// // PUT      modificar
// // PATCH   modificar
// // DELETE  borrar

// // GET
// fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
// .then(res => res.json())
// .then(data => {
//   // Puedo leer la informacion que recibi
//   console.log(data)
// })

// // POST
// Sirve para crear informacion

// // headers
// // body
// // JSON --> JavaScript Object Notation
// fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     address: 'asdfghjkl; 3456789',
//     email: 'pepo.pepe@gmail.com',
//     fullname: 'Pepo',
//     phone: '1924839292',
//   }),
// })
//   .then(res => res.json())
//   .then(data => {

//     console.log('lo que recibo del post', data)

//     fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
//       .then(res2 => res2.json())
//       .then(data2 => {
//         // Puedo leer la informacion que recibi
//         console.log('lo que recibo del get', data2);
//       });

//   });

// DELETE

// Permite eliminar informacion de una API
// GENERALMENTE sera la ruta de la coleccion donde esta esa info /id del elemento

// fetch('https://601da02bbe5f340017a19d60.mockapi.io/users/113', {
//     method: 'delete',
//     // headers: {} (a veces, algunas apis piden headers para metodo delete. Esta no.)
// })
// .then(res => res.json())
// .then(data => {
//   console.log(data)
// })

// PUT
// PATCH --> se usa poco

// Sirven para modificar informacion
// EN TEORIA el PUT recibe la informacion COMPLETA de un recurso que ya existe en la API
// y el PATCH recibe informacion PARCIAL de un recurso que ya existe en la API.
// Envian como respuesta el nuevo objeto con las modificaciones realizadas
// // PUT

// Supongamos que tengo un objeto "Misha el gato" a quien le quiero cambiar el nombre
// por "Misha el Gato"
// {
//     address: '235678',
//     email: 'misha@gmail.com',
//     fullname: 'Misha el Gato',
//     phone: '34567890',
//   }

// fetch('https://601da02bbe5f340017a19d60.mockapi.io/users/112', {
//   method: 'put',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     address: '235678',
//     email: 'misha@gmail.com',
//     fullname: 'Misha el Gato',
//     phone: '34567890',
//   }),
// })
// .then(res => res.json())
// .then(data => console.log(data))

// PATCH
// fetch('https://601da02bbe5f340017a19d60.mockapi.io/users/112', {
//   method: 'patch',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     fullname: 'MISHA EL GATOOOOO',
//   }),
// })
// .then(res => res.json())
// .then(data => console.log(data))

const formDos = document.querySelector(".formDos");
const fullnameForm = document.querySelector("#fullname").value;
const addressForm = document.querySelector("#address").value;
const phoneForm = document.querySelector("#phone").value;
const emailForm = document.querySelector("#email").value;

// // GET
const generarHtml = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const lista = document.querySelector("#lista");
      lista.innerHTML = "";
      data.map((nombre) => {
        lista.innerHTML += `<li>${nombre.fullname}<button class="botonesBorrar" id="${nombre.id}">Borrame</button>
        <button class="botonModificar" data="${nombre.id}">Modificame</button></li> `;
      });
      borrarUsuario();
      modificarUsuario();
    });
};
const borrarUsuario = () => {
  const todosBotones = document.querySelectorAll(".botonesBorrar");
  todosBotones.forEach((boton) => {
    boton.onclick = () => {
      let idUsuario = boton.id;
      console.log(idUsuario);

      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${idUsuario}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((_data) => {
          generarHtml();
        });
    };
  });
};

const formulario = document.querySelector("form");

formulario.onsubmit = (e) => {
  e.preventDefault();

  const fullname = document.querySelector("#fullname").value;
  const address = document.querySelector("#address").value;
  const phone = document.querySelector("#phone").value;
  const email = document.querySelector("#email").value;
  // POST
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: fullname,
      addres: address,
      phone: phone,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((_data) => {
      generarHtml();
    });
};

// / PATCH
const modificarUsuario = () => {
  const botonesModificar = document.querySelectorAll(".botonModificar");
  // console.log(botonesModificar);
  botonesModificar.forEach((boton) => {
    // console.log(botonesModificar);
    boton.onclick = () => {
      formDos.classList.remove("hidden");
      let idUsuario = boton.dataset;

      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${idUsuario}`)
        .then((res) => res.json())
        .then((info) => {
          fullnameForm.value = `${info.fullname}`;
          addressForm.value = `${info.address}`;
          phoneForm.value = `${info.phone}`;
          emailForm.value = `${info.email}`;
        });

      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${idUsuario}`, {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
          addres: address,
          phone: phone,
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => formDos.classList.add("hidden"), generarHtml());
    };
  });
};
generarHtml();
