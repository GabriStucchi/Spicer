
let logo = document.getElementById("logo")
let glare = document.getElementById("glare")


var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

let logoOffset = cumulativeOffset(logo)


glare.style.top = logoOffset.top + logo.clientHeight/2 + 'px'
glare.style.left = logoOffset.left + logo.clientWidth/2 + 'px'

console.log(glare.style.top)
console.log(glare.style.left)


