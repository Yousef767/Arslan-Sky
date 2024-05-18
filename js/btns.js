let btns = document.querySelectorAll('.wbtns .btn');
btns.forEach((e)=>{
  e.addEventListener('click',()=>{
    btns.forEach((e)=>{e.classList.add('btn2')})
    e.classList.remove('btn2')
  })
})