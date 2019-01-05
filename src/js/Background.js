class Background {
  constructor({image,width,height,speed,y,gameIns}){
    this.game = gameIns
    this.image = image
    this.width = width
    this.height = height
    this.speed = speed
    this.y = y;
    this.x = 0
    this.amount = parseInt(this.game.casDom.width / this.width) + 1;
  }
  pause(){
      this.speed = 0;
  }
  update() {
      this.x -= this.speed;
      if (this.x <= -this.width * this.amount) {
          this.x = 0;
      }
  }
  render() {
      for (var i = 0; i < this.amount * 2; i++) {
          this.game.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x + this.width * i, this.y, this.width, this.height);
      }
  }
}
module.exports = Background
