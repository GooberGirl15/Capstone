var capture;
let faceMesh;
let options = {maxFaces: 1, refineLandmarks: false, flipped: false};
let faces = [];
let fil;



function preload(){
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 400);
  capture = createCapture(VIDEO);
  capture.hide();
  faceMesh.detectStart(capture, gotFaces);
  
//  new Filter Class
  fil = new FilterClass(0,0,capture.width,capture.height);
  
}

function draw() {
  background(220);
  image(capture,0,0);
  faceBox();

//   Draw the Filter
   fil.createFilter();
  
}


// Get the face detection
function faceBox(){
  for (let i = 0; i < faces.length; i++){
    let face = faces[i];
    
    let x = face.box.xMin;
    let y = face.box.yMin;
    
    let w = face.box.width;
    let h = face.box.height;
    
    
    let xw = x+w
    let yh = y+h
    
    noFill();
    stroke(0,255,0);
    rect(x,y,w,h)
    
  }
  
}
function gotFaces(results){
  faces = results;
}



class FilterClass{
  constructor(x,y,X,Y){
    this.startX = x;
    this.startY = y;
    
    this.widthX = X;
    this.heightY = Y;
    this.step = 25;
  }
  
  createFilter(){
     capture.loadPixels();
  for (var x = this.startX; x < this.widthX + this.startX; x +=this.step){
    for (var y = this.startY; y < this.heightY + this.startY; y+= this.step){
      var index = ((y*capture.width) + x) * 4;
      
    var r = capture.pixels[index];     // Red channel
    var g = capture.pixels[index + 1]; // Green channel
    var b = capture.pixels[index + 2]; // Blue channel
      
      noStroke();

    fill(r, g, b);
    // you can change the shape of the 'pixels'
    rectMode(CENTER);
    rect(x, y, this.step, this.step);
    
  }
  }
  
}
}

