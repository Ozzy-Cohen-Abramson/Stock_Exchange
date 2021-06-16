const btn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultList = document.querySelector(".result-list");
const loadingInd = document.querySelector(".spinner-wrapper");

const companyImg = document.getElementById("company-profile-img");
const companyName = document.getElementById("company-name");
const companyDescription = document.getElementById("company-description");
const companyLink = document.getElementById("company-link");

const apiKey = "ed7c9cd6a18ece83772f68568ae443fd";

btn.addEventListener("click", () => {
  loadingInd.style.display = "block";
  resultList.innerHTML = "";
  const STOCK_SERVER = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;

  fetch(STOCK_SERVER)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((element) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        resultList.appendChild(li);

        li.innerText = `${element.name} (${element.symbol})`;
        loadingInd.style.display = "none";

        li.addEventListener("click", () => {
          let compUrl = new URL(
            `http://127.0.0.1:5500/Stock_Exchange/company.html?symbol=${element.symbol}`
          );
          let urlParams = new URLSearchParams(compUrl.search);

          let complaySymbol = urlParams.get("symbol");
          window.open(compUrl);
          const companyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${complaySymbol}`;
          // console.log(companyProfile);
          companyImg.src = companyProfile.image;
        });
      });
    });
});
