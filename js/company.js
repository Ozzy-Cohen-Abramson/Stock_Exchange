const companyImg = document.getElementById("company-profile-img");
const companyName = document.getElementById("company-name");
const companyDescription = document.getElementById("company-description");
const companyLink = document.getElementById("company-link");
const stockPrice = document.getElementById("stock-price");
const stockChanges = document.getElementById("changes");
const loadingInd = document.querySelector(".chart-spinner-wrapper");

let urlParams = new URLSearchParams(window.location.search);

let complanySymbol = urlParams.get("symbol");
const ctx = document.getElementById("myChart");

const companyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${complanySymbol}`;
const chartInfo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${complanySymbol}?serietype=line`;

fetch(companyProfile)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    companyImg.src = data.profile.image;
    companyName.innerText = data.profile.companyName;
    companyDescription.innerText = data.profile.description;
    companyLink.innerHTML = `<a href="${data.profile.website}">Company Website</a>`;
    stockPrice.innerText = `Stock price: $${data.profile.price} `;
    stockChanges.innerText = `(${data.profile.changes})`;

    if (data.profile.changes < 0) {
      stockChanges.style.color = "#33cc00";
    } else stockChanges.style.color = "#cc0066";
  });

loadingInd.style.display = "block";

fetch(chartInfo)
  .then((response) => {
    return response.json();
  })
  .then((info) => {
    const dataHistory = info.historical;
    console.log(info);
    const labels = dataHistory.map((element) => element.date);
    const closeGate = dataHistory.map((element) => element.close);
    labels.reverse();
    closeGate.reverse();

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Stock price history",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          rectRot: "rectRot",
          data: closeGate,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {},
    };

    loadingInd.style.display = "none";
    ctx.style.display = "block";
    let myChart = new Chart(ctx, config);
  });
