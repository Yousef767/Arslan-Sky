let file = document.getElementById('file');
let filelabel = document.querySelector('#filelabel');

file.addEventListener('input',()=>{
  filelabel.innerHTML = file.files[0].name;
})