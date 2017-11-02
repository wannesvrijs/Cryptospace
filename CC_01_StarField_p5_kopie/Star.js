

function Star() {
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
           

    
    colorMode(HSB,255)
    c = color(h,s,b)


    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 20, 0);
    ellipse(sx, sy, r, r);
          

  }
}
