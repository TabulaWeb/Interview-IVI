// render color
container.onmouseover = container.onmouseout = renderColor;

function renderColor(event) {
    if (event.type == 'mouseover') {
      document.querySelector('body').style.background = '#0070e0';
    }
    if (event.type == 'mouseout') {
      document.querySelector('body').style.background = '';
    }
};
const textContent = document.querySelectorAll('.ruby-content p');

// text effect
let count = 0
setTimeout(function tick() {
    count++
    if(count>3){
        count = 0
    }
    textContent.forEach(el => {
        el.style.display ='none'
    })
    textContent[count].style.display = 'block'
    timerId = setTimeout(tick, 2000); // (*)
}, 2000);
