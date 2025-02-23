let myCards = JSON.parse(localStorage.getItem("myCards") || "[]");

//Nav Bar
const ulEl = document.querySelector("ul");

const navLinks = ["About", "Flash Card", "Gallery", "Add a Card"];

const fragment = new DocumentFragment();
//Populate the nav bar
for (const link of navLinks) {
  const li = document.createElement("li");
  const aEl = document.createElement("a");
  aEl.textContent = link;

  if (link === "About") {
    aEl.setAttribute("href", "#about");
  } else if (link === "Flash Card") {
    aEl.setAttribute("href", "#flash");
  } else if (link === "Gallery") {
    aEl.setAttribute("href", "#image-gallery");
  } else if (link === "Add a Card") {
    aEl.setAttribute("href", "#add-image");
  }

  li.append(aEl);
  fragment.append(li);
}

ulEl.appendChild(fragment);

const imageGallery = document.querySelector("#image-gallery");

//Load imageGallery
function loadGallery(myCards) {
  myCards.forEach((obj) => {
    const card = createCard(obj.wOQ, obj.answer);
    imageGallery.append(card);
  });
}

loadGallery(myCards);

//Get Form data on submit
const formEl = document.getElementById("add-image");
//clear the form
const newArr = Array.from(formEl.elements);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const card = createCard(formEl[0].value, formEl[1].value);
  myCards.push({ wOQ: formEl[0].value, answer: formEl[1].value });
  localStorage.setItem("myCards", JSON.stringify(myCards));
  imageGallery.append(card);

  newArr.forEach((element) => {
    if (element.type !== "submit") {
      element.value = "";
    }
  });
});

//takes the form data and generates a new card
function createCard(wOQ, answer) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const coverDiv = document.createElement("div");
  coverDiv.classList.add("cover");
  const nameHEl = document.createElement("h1");
  nameHEl.textContent = wOQ;
  const namePEl = document.createElement("p");
  nameHEl.textContent = wOQ;
  namePEl.textContent = "Answer:";
  const descPEl = document.createElement("p");
  descPEl.textContent = answer;
  const xSpan = document.createElement("span");
  xSpan.textContent = "X";

  cardDiv.append(xSpan);
  cardDiv.append(nameHEl);
  coverDiv.append(namePEl);
  coverDiv.append(descPEl);
  cardDiv.appendChild(coverDiv);

  return cardDiv;
}

imageGallery.addEventListener("click", (event) => {
  const target = event.target.parentElement;
  if (target.classList.contains("cover")) {
    if (target.style.height === "10%" || target.style.height === "") {
      target.style.height = "70%";
    } else {
      target.style.height = "10%";
    }
  }
  //Delete card
  if (event.target.innerHTML === "X") {
    if (confirm("Are you sure you want to delete this item?")) {
      const currentCard = event.target.nextSibling.textContent;

      deleteCard(currentCard);
    }
  }
});

const flashCard = document.getElementById("flash-card");
//load a random flash card from the gallery
function loadFlashCard(myCards) {
  const randomNum = Math.floor(Math.random() * myCards.length);
  const h1El = document.createElement("h1");
  h1El.textContent = myCards[randomNum].wOQ;
  const pEl = document.createElement("p");
  pEl.textContent = myCards[randomNum].answer;
  pEl.style.color = "var(--card-bg)";

  flashCard.append(h1El);
  flashCard.append(pEl);
}

loadFlashCard(myCards);

//Event to flip the card
const flipBtn = document.getElementById("flipbtn");

flipBtn.addEventListener("click", () => flipCard(true, 180));

function flipCard(reveal, deg) {
  flashCard.style.transform = `rotateY(${deg}deg)`;
  flashCard.firstChild.style.transform = `rotateY(${deg}deg)`;
  flashCard.lastChild.style.transform = `rotateY(${deg}deg)`;
  if (reveal) {
    setTimeout(() => {
      flashCard.lastChild.style.color = "black";
    }, 1000);
  }
}

//Get a random card on button press

const randomButton = document.getElementById("random");

randomButton.addEventListener("click", () => {
  flashCard.innerHTML = "";
  loadFlashCard(myCards);
  flipCard(false, 360);
});

function deleteCard(cardName) {
  myCards.forEach((obj) => {
    if (obj.wOQ === cardName) {
      const index = myCards.indexOf(obj);
      myCards.splice(index, 1);
    }
    imageGallery.innerHTML = "";
    loadGallery(myCards);
    localStorage.setItem("myCards", JSON.stringify(myCards));
  });
}
