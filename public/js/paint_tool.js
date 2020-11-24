if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';
}
/*window.addEventListener("orientationchange", function() {
    location.reload();
}, false);
 Painting Variables  */
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
  { name: 'color1', hex: '#DA2F5D' },
  { name: 'color2', hex: '#8D1F6F' },
  { name: 'color3', hex: '#F2C298' },
  { name: 'color4', hex: '#ED6B4D' },
  { name: 'color5', hex: '#E94638' },
  { name: 'color6', hex: '#B4348B' },
  { name: 'color7', hex: '#2E286A' },
  { name: 'color8', hex: '#494798' },
  { name: 'color9', hex: '#5F5FA8' },
  { name: 'color10', hex: '#F3A81C' },
  { name: 'color11', hex: '#443843' },
  { name: 'color12', hex: '#D9CCB4' },
  { name: 'color1', hex: '#D97439' },
  { name: 'color2', hex: '#ED6B4D' },
  { name: 'color3', hex: '#DA4A2A' },
  { name: 'color4', hex: '#26A6DA' },
  { name: 'color5', hex: '#23B8D9' },
  { name: 'color6', hex: '#F3D49B' },
  { name: 'color7', hex: '#F39A79' },
  { name: 'color8', hex: '#333233' },
  { name: 'color9', hex: '#F2959D' },
  { name: 'color10', hex: '#252223' },
  { name: 'color11', hex: '#8BBFBA' },
  { name: 'color12', hex: '#E8973D' }

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
    stencil = loadImage('/public/img/final-2.png',img => stencilCopy = img.get());
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
