class Bird {
  constructor({gameIns}) {
    this.game = gameIns
    this.x = (this.game.casDom.width - 85) / 2;
    this.y = 100;
    this.w = 85;
    this.h = 60;
    this.swing = 0;
    this.dY = 1;
    this.dropStatFram = this.game.frameUtil.currentFrame;
    this.ro = 0;
    this.bindClickListener();
    this.state = 0;
    //
    this.deltaY = 1;
    this.swingSpeed = 5;
    this.die = false;
    this.dieAnimate = 0;
  }
  fly(){
      this.state = 1;
      this.ro = -25;
      this.deltaY = 1;
      this.swingSpeed = 2;
  }
  update(){
      if(this.die){
          this.dieAnimate ++;
          if(this.dieAnimate == 30){
              this.game.stop();
          }
          return;
      }
      if (this.game.frameUtil.currentFrame % this.swingSpeed == 0) {
          this.swing++;
          if (this.swing > 2) {
              this.swing = 0;
          }
      }

      if(this.state == 0) {
          this.swingSpeed = 5;
          this.dY = 0.010 * Math.pow(this.game.frameUtil.currentFrame - this.dropStatFram, 2);
          this.ro++;
      }else if(this.state == 1){
          this.deltaY += 1;
          this.dY = -14 + this.deltaY;

          if(this.dY > 0){
              this.state = 0;
              this.dropStatFram = this.game.frameUtil.currentFrame;
          }
      }
      this.y += this.dY;

      if(this.y < 0){
          this.y = 0;
      }
      if(this.y > this.game.casDom.height - 50 - this.h){
          this.game.gameover();
      }
  }
  render(){
      if(this.die){
          var row = parseInt(this.dieAnimate / 5);
          var col = this.dieAnimate % 5;
          this.game.ctx.drawImage(this.game.SrcManager.blood,325 * col , 138*row,325,138,this.x - 155,this.y + 50,325,138)
          return;
      }
      this.game.ctx.save();
      this.game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      this.game.ctx.rotate((Math.PI / 180) * this.ro);
      this.game.ctx.translate(-(this.x + this.w / 2 ), -( this.y + this.h / 2));
      this.game.ctx.drawImage(this.game.SrcManager.bird, this.swing * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h);
      this.game.ctx.restore();
  }
  bindClickListener(){
      this.game.casDom.addEventListener("mousedown",() => this.fly() );
      this.game.casDom.addEventListener("touchstart",e => {
          e.preventDefault();
          this.fly();
      });
  }
}
module.exports = Bird
