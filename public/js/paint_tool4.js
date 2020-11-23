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
  { name: 'color1', hex: '#414893' },
  { name: 'color2', hex: '#5499D2' },
  { name: 'color3', hex: '#00C9AB' },
  { name: 'color4', hex: '#7EBC54' },
  { name: 'color5', hex: '#E6DF3D' },
  { name: 'color6', hex: '#F7BE00' },
  { name: 'color7', hex: '#FF4713' },
  { name: 'color8', hex: '#EA0029' },
  { name: 'color9', hex: '#C10230' },
  { name: 'color10', hex: '#93358D' },
  { name: 'color11', hex: '#53007D' },
  { name: 'color12', hex: '#46373C' },
  { name: 'color13', hex: '#414893' },
  { name: 'color14', hex: '#5499D2' },
  { name: 'color15', hex: '#00C9AB' },
  { name: 'color16', hex: '#7EBC54' },
  { name: 'color17', hex: '#E6DF3D' },
  { name: 'color18', hex: '#F7BE00' },
  { name: 'color19', hex: '#FF4713' },
  { name: 'color20', hex: '#EA0029' },
  { name: 'color21', hex: '#C10230' },
  { name: 'color22', hex: '#93358D' },
  { name: 'color23', hex: '#53007D' },
  { name: 'color24', hex: '#46373C' }

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
    stencil = loadImage('/public/img/final-5.png',img => stencilCopy = img.get());
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
