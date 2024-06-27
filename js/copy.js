let copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click',()=>{
  navigator.clipboard.writeText(copyBtn.dataset.url);
    let div = document.createElement("div");
    div.className = "message";
    let span = document.createElement("span");
    span.innerHTML = 'تم نسخ الرابط';
    document.body.appendChild(div);
    div.appendChild(span);
    setTimeout(() => {
      div.remove();
    }, 2700);
  
})

