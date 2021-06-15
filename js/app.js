const btn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultList = document.querySelector(".result-list");
const loadingInd = document.querySelector(".spinner-wrapper");

const apiKey = "ed7c9cd6a18ece83772f68568ae443fd";

function openStockWeb() {}

btn.addEventListener("click", () => {
  console.log(searchInput.value);
  loadingInd.style.display = "block";
  resultList.innerHTML = "";
  const STOCK_SERVER = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
  fetch(STOCK_SERVER)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      data.forEach((element) => {
        // console.log(element);
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        resultList.appendChild(li);
        li.innerText = `${element.name} (${element.symbol})`;
        loadingInd.style.display = "none";
        li.addEventListener("click", () => {
          window.open(`/company.html?symbol=${element.symbol}`);
        });
      });
    });
});
