// import axios from "axios";
import * as Carousel from "./Carousel.mjs";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// console.log(breedSelect);
// The information section div element.
const infoDump = document.getElementById("infoDump");
// console.log(infoDump);
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// console.log(progressBar);
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
// console.log(getFavouritesBtn);
// Step 0: Store your API key here for reference and easy access.
//========================================================================================================//
const API_KEY =
  "live_WP5thLG1uRXMRvBqQ8gW6TZOQpr99TbTwIOfBjS04urJlLYckwY7No2RhITGmWGI";
//========================================================================================================//

//========================================================================================================//
// USE THEN WHEN ACCESSING API OUTSIDE OF A ASYNC FUNCTION FOR AXIOS
// axios("https://api.thecatapi.com/v1/images/search")
//   .then((x) => {
//     console.log(x);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//========================================================================================================//

//========================================================================================================//
// USE THEN WHEN ACCESSING API OUTSIDE OF A ASYNC FUNCTION FOR FETCH
// fetch("https://api.thecatapi.com/v1/images/search")
//   .then((x) => {
//     // console.log(x);
//     x.json().then((x) => {
//       console.log(x);
//     });
//   })
//   .catch((e) => {
//     console.log(e);
//   });
//========================================================================================================//

//========================================================================================================//
// ASYNC FUNCTION WITH AXIOS
// async function testApi1() {
//   let apiData = await axios(
//     "https://api.thecatapi.com/v1/images/search?limit=10"
//   );
//   console.log(apiData.data);
// }

// testApi1().then((x) => {
//   //console.log(x);
// });
//========================================================================================================//

//========================================================================================================//
// ASYNC FUNCTION WITH FETCH
// async function testApi() {
//   let apiData = await fetch(
//     "https://api.thecatapi.com/v1/images/search?limit=10"
//   );
//   let apiDataJson = await apiData.json();
//   console.log(apiDataJson);
// }

// testApi().then((x) => {
//   //console.log(x);
// });
//========================================================================================================//
console.log(
  "====================================== fetch solution ======================================"
);
//========================================================================================================//
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  // let apiData = await fetch(
  //   `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=beng&api_key=${API_KEY}`
  // );
  let apiData = await fetch(`https://api.thecatapi.com/v1/breeds`);
  let apiDataJson = await apiData.json();

  loadCat();
  return apiDataJson;
}
//-------------------------------------------------------------------------------------------------------//
initialLoad().then((cats) => {
  let count = 1;
  cats.forEach((cat) => {
    // console.log(cat);
    let catOptions = document.createElement("option");
    catOptions.setAttribute("value", `${cat.id}`);
    catOptions.textContent = `${cat.name} ${count++}`;
    breedSelect.appendChild(catOptions);
  });
});
//========================================================================================================//

//========================================================================================================//
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
//-------------------------------------------------------------------------------------------------------//
// const tesCar = Carousel.createCarouselItem;
// console.log(tesCar);
breedSelect.addEventListener("change", loadCat);

async function loadCat() {
  console.log(breedSelect.value);
  Carousel.clear();
  let apiData2 = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${breedSelect.value}&api_key=${API_KEY}`
  );

  if (infoDump.firstChild !== null) {
    infoDump.removeChild(infoDump.firstChild);
  }
  const response = apiData2.json();
  response.then((cat) => {
    const pElem = document.createElement("p");
    cat.forEach((catData) => {
      if (infoDump.firstChild !== null) {
        infoDump.removeChild(infoDump.firstChild);
      }
      const newCarousel = Carousel.createCarouselItem(
        catData.url,
        catData.id,
        catData.id
      );

      if (catData.breeds[0]) {
        pElem.textContent = catData.breeds[0].description;
      } else {
        pElem.textContent = "There is no description for this beautiful feline";
      }
      Carousel.appendCarousel(newCarousel);
    });
    const hrPreTag = document.createElement("hr");
    const hrAppTag = document.createElement("hr");
    pElem.style.fontSize = "30px";
    pElem.style.padding = "15px";
    pElem.style.color = "white";
    infoDump.prepend(hrPreTag);
    infoDump.appendChild(pElem);
    infoDump.appendChild(hrAppTag);
  });
}
//========================================================================================================//

//========================================================================================================//
export async function favourite(imgId) {
  // your code here
}
