const cardList = document.querySelector(".js-list"),
  pickBtn = document.querySelector(".js-pickBtn"),
  banner = document.querySelector(".js-banner");

pickBtn.addEventListener("click", function (e) {
  cardList.classList.add("show");
  banner.classList.add("hide");
});
