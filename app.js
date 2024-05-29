const ulEl = document.querySelector("ul");

const navLinks = ["About", "Images", "Suggestion"];

const fragment = new DocumentFragment();

for (const link of navLinks) {
  const li = document.createElement("li");
  li.textContent = link;
  fragment.append(li);
}

ulEl.appendChild(fragment);

// const
const imageGallery = document.querySelector("#image-gallery");

const formEl = document.getElementById("add-image");
console.dir(formEl);

let formData = {
  name,
  description,
  url,
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  formData.name = formEl[0].value;
  formData.url = formEl[1].value;
  formData.description = formEl[2].value;
  console.log(formData);

  const card = createCard(formData.name, formData.description, formData.url);

  imageGallery.append(card);
});

function createCard(name, description, url) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image");
  const coverDiv = document.createElement("div");
  coverDiv.classList.add("cover");
  const namePEl = document.createElement("p");
  namePEl.classList.add("cover-name");
  namePEl.textContent = name;
  const descPEl = document.createElement("p");
  descPEl.textContent = description;

  coverDiv.append(namePEl);
  coverDiv.append(descPEl);

  cardDiv.appendChild(imageDiv);
  cardDiv.appendChild(coverDiv);

  return cardDiv;
}

imageGallery.addEventListener("click", (event) => {
  console.dir(event.target.parentElement);
  if (event.target.classList.contains("cover-name")) {
    const target = event.target.parentElement;
    console.log(target.style.height);
    if (target.style.height === "10%" || target.style.height === "") {
      target.style.height = "70%";
    } else {
      target.style.height = "10%";
    }
  }
});
