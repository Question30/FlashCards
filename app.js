const ulEl = document.querySelector("ul");

const navLinks = ["About", "Images", "Suggestion"];

const fragment = new DocumentFragment();

for (const link of navLinks) {
  const li = document.createElement("li");
  li.textContent = link;
  fragment.append(li);
}

ulEl.appendChild(fragment);
