if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';
}
window.addEventListener("orientationchange", function() {
    location.reload();
}, false);
/* Painting Variables  */
var canvas,pg;
var drawing;
var uColor = "#FF0000";
let strokeWidth = 20
var wWidth,cW,cH;


/* UI  */
var containerW,containerH,container;
container = document.getElementById("uContainer");
containerW = container.offsetWidth;
containerH = containerW/1.777777777777778;



uBrush = document.getElementById("uBrush")
uBrushW = uBrush.offsetWidth;
$("#uBrush").css("height", uBrushW);
var colours = [
  { name: 'color1', hex: '#222222' },
  { name: 'color2', hex: '#4a4a4a' },
  { name: 'color3', hex: '#ababab' },
  { name: 'color4', hex: '#53007d' },
  { name: 'color5', hex: '#7e3599' },
  { name: 'color6', hex: '#9983cc' },
  { name: 'color7', hex: '#1255b2' },
  { name: 'color8', hex: '#0090e9' },
  { name: 'color9', hex: '#75caee' },
  { name: 'color10', hex: '#00a980' },
  { name: 'color11', hex: '#00c9ab' },
  { name: 'color12', hex: '#99ebd9' },
  { name: 'color1', hex: '#004d33' },
  { name: 'color2', hex: '#007d1e' },
  { name: 'color3', hex: '#7ebc54' },
  { name: 'color4', hex: '#99e09e' },
  { name: 'color5', hex: '#d8fd36' },
  { name: 'color6', hex: '#fcf50d' },
  { name: 'color7', hex: '#ff4612' },
  { name: 'color8', hex: '#ff8200' },
  { name: 'color9', hex: '#f9be00' },
  { name: 'color10', hex: '#991e21' },
  { name: 'color11', hex: '#eb0029' },
  { name: 'color12', hex: '#e79096' }

];
var  myArray = $('.color');
myArray.each( function(i) {
    //console.log(i + " " + colours[i]);
    $(this).css("background-color", colours[i].hex);
});





var uCanvas = document.getElementById("uCanvas");
cW = uCanvas.offsetWidth;
cH = uCanvas.offsetHeight;

console.log(containerW);
console.log(containerH);
console.log("Brush" + uBrushW);
console.log(window.innerWidth);
console.log(window.innerHeight);


/* Preload Image */
let stencil,stencilCopy,templateRatio;
function preload() {
    stencil = loadImage('/public/img/final-3.png',img => stencilCopy = img.get());
}


function setup() {
    frameRate(30);
    canvas = createCanvas(cW, cH);
    canvas.parent('uCanvas');
    stencil.resize(cW, cH);

    image(stencil,0,0);

    /* OffScreen Setup */
    pg = createGraphics(cW, cH);
    pg.background(255,255,255);


 }

 function draw(){
    background(255,255,255);


    if(drawing){
        pg.smooth();
        pg.stroke(color(uColor));
        pg.strokeWeight(strokeWidth);
        pg.line(mouseX, mouseY, pmouseX, pmouseY);

    } else{
        pg.stroke(0,0,0,0);

      }
    image(pg,0,0,uCanvas.offsetWidth,uCanvas.offsetHeight);
    image(stencil,0,0,uCanvas.offsetWidth,uCanvas.offsetHeight);

 }


 /* ::::::::::::::::::::::::::::::::::::::::*/
/* Touch  */
/* ::::::::::::::::::::::::::::::::::::::::*/
 function mouseDragged() {
    drawing = true;
  }

  function mouseReleased() {
    drawing = false;
  }

  function touchStarted(event){
    drawing = true;
     var currentElement = event.target;
     console.log(currentElement.className);
     if(currentElement.classList[0] == "color"){
      uColor = currentElement.style.backgroundColor;
      sizeB.style("fill", uColor);
     }else if(currentElement.tagName == "INPUT"){
        console.log("AEIOU");
     }else{
      return false;
     }

  }

  function touchEnded(){
    drawing = false;
  }




/* ::::::::::::::::::::::::::::::::::::::::*/
/* Window Resized  */
/* ::::::::::::::::::::::::::::::::::::::::*/

 function windowResized(){

    // window.location.reload();
    outlineB.attr("cx",uBrush.offsetWidth/2).attr("cy",uBrush.offsetHeight/2);
    sizeB.attr("cx",uBrush.offsetWidth/2).attr("cy",uBrush.offsetHeight/2);
    resizeCanvas(uCanvas.offsetWidth, uCanvas.offsetHeight);
  }
/* ::::::::::::::::::::::::::::::::::::::::*/
/* Brush UI */
/* ::::::::::::::::::::::::::::::::::::::::*/
 var rangeslider = document.getElementById("brushScale");
 rangeslider.oninput = function() {
   strokeWidth = this.value;
   sizeB.attr("r", strokeWidth/2);

 }
var outlineB = d3.select("#circle1");
outlineB.style("fill", "white")
    .style("stroke","black")
    .attr("r", uBrushW/3)
    .attr("cx",uBrush.offsetWidth/2)
    .attr("cy",uBrush.offsetHeight/2);

var sizeB = d3.select("#circle2");
sizeB.style("fill", uColor)
    .attr("r", 10)
    .attr("cx",uBrush.offsetWidth/2)
    .attr("cy",uBrush.offsetHeight/2);

function setColor(x) {
    uColor = x.value;
}


/* ::::::::::::::::::::::::::::::::::::::::*/
/* Brush UI */
/* ::::::::::::::::::::::::::::::::::::::::*/
$( "#sendCanvas" ).on('click',function() {
    saveCanvas('myCanvas', 'jpg');
    modal.style.display = "block";
  });
