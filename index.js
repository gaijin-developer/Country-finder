const countriesContainer = document.getElementById("countriesContainer");
let allCountriesButton = document.getElementById("allCountriesButton");
//added elements
const listChild = document.querySelectorAll(".listChild");
const listCap = document.querySelectorAll(".listCap");

let error = new Error("please enter more than 5 characters");
let countries;

const createNewAppElement = (element) => {
  return document.createElement(element);
};
const createArrayUtil = (obj) => {
  arr = [];
  for (key in obj) {
    arr.push(key);
  }
  return arr;
};

async function getAllCountries() {
  cleanup();
  let result = await fetch("https://restcountries.com/v3.1/all");

  result = await result.json();

  result.forEach((element) => {
    let countryElement = createNewAppElement("li");
    countryElement.setAttribute("class", "countryCard");

    countriesContainer.append(countryElement);

    let currencies = element.currencies; //get all currencies
    let languages = element.languages;

    let currencyNames = createArrayUtil(currencies);

    countryElement.innerHTML = element.name.common;

    let capitalElement = createNewAppElement("p");
    capitalElement.setAttribute("class", "countryCapital");
    countryElement.appendChild(capitalElement);

    capitalElement.innerHTML = element.capital;

    if (element.currencies) {
      currencyNames.forEach((currencyName) => {
        let currEll = createNewAppElement("p");
        countryElement.appendChild(currEll);
        currEll.innerHTML = `Currencies:<br/> ${element.currencies[currencyName].name}`;
      });
    } else {
      let currEll = createNewAppElement("p");
      countryElement.appendChild(currEll);
      currEll.innerHTML =
        "<p>Currency: No currency found for this country/region</p>";
    }
  });
  return;
}

const getSingleCountry = async (countryName) => {
  cleanup();
  let searchedCountry = document.getElementById("inputSec");
  searchedCountry = searchedCountry.value.trim();

  if (searchedCountry) {
    let result = await fetch(
      "https://restcountries.com/v3.1/name/" + searchedCountry
    );
    if (result.status === 404) {
      let countryElement = createNewAppElement("li");
      countryElement.setAttribute("class", "countryCard");

      countriesContainer.append(countryElement);

      countryElement.innerHTML = `No country found with the name ${}`;

      return;
    } else {
      result = await result.json();

      let countryElement = createNewAppElement("li");
      countryElement.setAttribute("class", "countryCard");

      countriesContainer.append(countryElement);

      let currencies = result[0].currencies; //get all currencies
      let languages = result[0].languages;

      let currencyNames = createArrayUtil(result[0].currencies);

      countryElement.innerHTML = result[0].name.common;

      let capitalElement = createNewAppElement("p");

      capitalElement.setAttribute("class", "countryCapital");

      countryElement.appendChild(capitalElement);
      capitalElement.innerHTML = result[0].capital;

      if (result[0].currencies) {
        currencyNames.forEach((currencyName) => {
          let currEll = createNewAppElement("p");
          countryElement.appendChild(currEll);
          currEll.innerHTML = `Currencies:<br/> ${result[0].currencies[currencyName].name}`;
        });
      } else {
        let currEll = createNewAppElement("p");
        countryElement.appendChild(currEll);
        currEll.innerHTML =
          "<p>Currency: No currency found for this country/region</p>";
      }
    }
  }
};

// Cleanup Function
let cleanup = () => {
  let countryCardLarge = document.getElementsByClassName("countryCard");

  if (countryCardLarge.length <= 0) {
    return;
  } else {
    for (let i = 0; i <= countryCardLarge.length; i++) {
      if (countryCardLarge[i]) {
        countryCardLarge[i].style.display = "none";
      }
    }
  }
  return;
};
