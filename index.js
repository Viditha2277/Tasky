const taskContainer = document.querySelector(".task_container");
let globalStore = [];//array of objects

/********************************************** Generating the card **********************************/ 

const generateNewCard = (taskData) => `
  <div id=${taskData.id} class="col-sm-12 col-md-6 col-lg-4">
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${taskData.id}"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger" id=${taskData.id} ><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard()"></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageUrl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
   <p class="card-text">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;


  /*********************************** loading localStorage Area to Globbal stirage *************************/

const loadInitialCardData = () => {

  //localstorage to get tasky card data
const getCardData = localStorage.getItem("tasky");


  //covert to normal object
const {cards} = JSON.parse(getCardData);


  //loop over those array of task obejct to create HTML card , inject it to DOM
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update our globalStore
  globalStore.push(cardObject);
})

};


/****************************************** creating the card *******************************************/

const saveChanges = () => {
  
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageURL").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value
  };

taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

globalStore.push(taskData);

localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};


/***************************************** Deleting the Card **************************************************/


const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


/******************************************* editing the card **************************************************/


const editCard = (event) =>{
  event = window.event;
  const targetID = event.target.id;

  globalDataStore = globalStore.filter((cardObject) => cardObject.id === targetID);

  document.getElementById("taskTitle").value = "globalDataStore.taskTitle";
  document.getElementById("imageURL").value = "globalDataStore.imageUrl";
  document.getElementById("taskType").value = "globalDataStore.taskType";
  document.getElementById("taskDescription").value = "globalDataStore.taskDescription";

  deleteCard();

  const taskyData = {
    id: targetID,
    imageUrl: document.getElementById("imageURL").value,
    taskTitle: document.getElementById("taskTitle").value,
    taskType: document.getElementById("taskType").value,
    taskDescription: document.getElementById("taskDescription").value
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskyData));

  globalStore = globalStore.filter((cardObject) => cardObject.id === targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

}
