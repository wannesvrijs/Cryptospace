function Transaction(amount) {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
    

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
    }
  }

  this.show = function() {
           
  var h = map(mouseX, 0, width, 80, 220);
  var s = map(mouseY, 0, height, 0, 255);
  var b = brightness;
  // var b = bSlider.value();
  // bSlider.x * 2 + bSlider.width, 95;  
    
    colorMode(HSB,255)
    c = color(h,s,b)
    fill(c);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, amount, 0);
    ellipse(sx, sy, r, r);      

  }
}
