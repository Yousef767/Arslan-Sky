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

document.addEventListener("DOMContentLoaded", function() {
  let tables = document.querySelectorAll("table");
  if(tables){
    tables.forEach(function(table) {
      let container = table.closest('.taIn'); 

      var isDragging = false;
      var startX, startY;
      var startScrollLeft, startScrollTop;
      var dragSpeed = 2; 

      table.addEventListener("mousedown", function(e) {
          if (e.target.tagName.toLowerCase() !== 'button') {
              isDragging = true;
              startX = e.pageX;
              startY = e.pageY;
              startScrollLeft = container.scrollLeft;
              startScrollTop = container.scrollTop;
              table.style.userSelect = 'none'
          }
      });

      document.addEventListener("mouseup", function() {
          isDragging = false;
          table.style.userSelect = 'none'
      });

      document.addEventListener("mousemove", function(e) {
          if (isDragging) {
              var dx = (e.pageX - startX) * dragSpeed;
              var dy = (e.pageY - startY) * dragSpeed;
              
              container.scrollLeft = startScrollLeft - dx;
              container.scrollTop = startScrollTop - dy;
              
          }
      });
  });
  }
});
