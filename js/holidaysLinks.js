let hLinks = document.querySelectorAll(".nLink");
hLinks.forEach((e) => {
  e.addEventListener("click", () => {
    hLinks.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});


