// let addToy = false;
// toyList = [];

// function processLike(event) {
//   const toyDiv = event.target.parentNode;
//  const toyId = toyDiv.dataset.id;
//  const toy = toyList.find(toy => toy.id == toyId);
//  // submit a patch request
//  fetch(`http://localhost:3000/toys/${toyId}`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify({likes: ++toy.likes})
//  }).then(res => res.json()).then(newToy => {
//     // increase the like count
//     toyDiv.querySelector("p").textContent = `${newToy.likes} Likes `;
//  });
// }

// function addNewToy(toy) {
//   const toyCollection = document.querySelector("#toy-collection");
//   let toyDiv = document.createElement("div");
//   toyDiv.className = "card";
//   toyDiv.dataset.id = toy.id;
//   toyDiv.innerHTML = `<h2>${toy.name}</h2>
//   <img src="${toy.image}" class="toy-avatar" />
//   <p>${toy.likes} Likes </p>`;

//   let likeBtn = document.createElement("button");
//   likeBtn.className = "like-btn";
//   likeBtn.textContent = "Like <3";

//   likeBtn.addEventListener("click", processLike);

//   toyDiv.appendChild(likeBtn);
//   toyCollection.appendChild(toyDiv);
// }

// function addToySubmit(event) {
//   event.preventDefault();
//   const toy = {name: event.target.name.value, image: event.target.image.value, likes: 0};
//   fetch("http://localhost:3000/toys", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(toy)
//   }).then(res => res.json()).then(addNewToy);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

//   fetch("http://localhost:3000/toys").then(res => res.json()).then(res => {
//     toyList = res;
//     toyList.forEach(addNewToy);
//   });

//   document.querySelector(".add-toy-form").addEventListener("submit", addToySubmit);
// });




// OR 2 - this allows the 'likes' patch button to work:

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      renderToys(obj_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})




// OR 3: This adds a delete function

// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false

// // YOUR CODE HERE
// document.addEventListener("DOMContentLoaded", ()=>{
//   // console.log("%cDOM is loaded", "color :purple")
//   const toyCollection = document.querySelector("#toy-collection")
//   fetch("http://localhost:3000/toys")
//     .then(r => r.json())
//     .then(toys => {
//       // Take my toys array make HTML with them in ORDER TO ADD THEM TO THE DOM
//       let toysHTML = toys.map(function(toy){
//         return `
//         <div class="card">
//           <h2>${toy.name}</h2>
//           <img src=${toy.image} class="toy-avatar" />
//           <p>${toy.likes} Likes </p>
//           <button data-id="${toy.id}" class="like-btn">Like <3</button>
//           <button data-id="${toy.id}" class="delete-btn">back in the toy chest</button>
//         </div>
//         `
//       })
//       toyCollection.innerHTML =
//       toysHTML.join('')
//     })

//   toyForm.addEventListener("submit", function(e){
//     e.preventDefault()
//     console.log(e.target.name)
//     // Grab the inputs from form
//     const toyName = e.target.name.value
//     const toyImage = e.target.image.value

//     fetch("http://localhost:3000/toys", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         name: toyName,
//         image: toyImage,
//         likes: 0
//       })
//     })
//     .then( r => r.json())
//     .then( newToy => {
//       // fetch updated the DB
//       // NOW I NEED TO UPDATE THAT DOM!
//       // convert the newToy from JSON to HTML in ORDER TO ADD IT TO DOM
//       let newToyHTML = `
//         <div class="card">
//           <h2>${newToy.name}</h2>
//           <img src=${newToy.image} class="toy-avatar" />
//           <p>${newToy.likes} Likes </p>
//           <button data-id="${newToy.id}" class="like-btn">Like <3</button>
//           <button data-id="${newToy.id}" class="delete-btn">Put Toy back</button>
//         </div>
//       `

//       toyCollection.innerHTML += newToyHTML
//       console.log(e.target.reset())
//     })

//   })

//   toyCollection.addEventListener("click", (e) => {
//     if (e.target.className === "like-btn"){

//       let currentLikes = parseInt(e.target.previousElementSibling.innerText)
//       let newLikes = currentLikes + 1
//       e.target.previousElementSibling.innerText = newLikes + " likes"

//       fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           likes: newLikes
//         })
//       })
//     }

//     if (e.target.className === "delete-btn"){
//       fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
//         method: "DELETE"
//       })
//       .then(r => {
//         e.target.parentElement.remove()
//       })
//     }
//   })


//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//       // submit listener here
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })


//   // OR HERE!


// })