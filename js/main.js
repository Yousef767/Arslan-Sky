let i = document.querySelectorAll(".i");

i.forEach((e) => {
  e.addEventListener("click", () => {
    i.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});

let passowrdsShowIcons = document.querySelectorAll("#passwordShow");
if (passowrdsShowIcons) {
  passowrdsShowIcons.forEach((e) => {
    e.addEventListener("click", () => {
      e.parentElement.classList.toggle('showPassword');
      if (e.parentElement.classList.contains("showPassword")) {
        e.className = "fa-light fa-eye";
        e.previousElementSibling.setAttribute("type", "text");
      } else {
        e.className = "fa-light fa-eye-slash";
        e.previousElementSibling.setAttribute("type", "password");
      }
    });
  });
}
