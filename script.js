const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const imageContainer = document.querySelector(".image-container");
const loadMoreBtn = document.querySelector(".show-more");

const ACCESS_KEY = "";

let page = 1;

const searchImages = async () => {
  let searchQuery = searchInput.value;
  if (page === 1) {
    imageContainer.innerHTML = "";
  }

  if (!searchQuery) {
    alert("Please enter search query!");
    return;
  }

  let array = imageContainer.querySelectorAll("a");

  [...array].forEach((aTag) => {
    if (aTag.className !== searchQuery) {
      imageContainer.removeChild(aTag);
    }
  });

  try {
    let API = `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&per_page=12&page=${page}&query=${searchQuery}`;

    let response = await fetch();

    const { results } = await response.json();

    results.forEach((result) => {
      let imgTag = document.createElement("img");
      imgTag.src = result.urls.small;

      let imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.className = searchQuery;
      imgLink.target = "_blank";

      imgLink.appendChild(imgTag);
      imageContainer.appendChild(imgLink);
      loadMoreBtn.classList.add("show");
    });
  } catch (error) {
    alert("Something went wrong!");
  }
};

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    loadMoreBtn.classList.remove("show");

    searchImages();
  }
});

searchButton.addEventListener("click", () => {
  loadMoreBtn.classList.remove("show");
  searchImages();
});
loadMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
