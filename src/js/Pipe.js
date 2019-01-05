class Pipe {
  constructor({gameIns}){
    this.game = gameIns
    //0表示管子向上、1表示管子向下。
    this.type = _.random(0,1);
    //管子的高度
    this.h = _.random(100 ,this.game.casDom.height / 2);
    //x位置
    this.x = this.game.casDom.width;
    //y位置
    this.y = this.type == 0 ? this.game.casDom.height - this.h - 44 : 0;
    //宽度
    this.w = 148;
    //速度
    this.speed = 3;
    this.game.pipeArray.push(this)
  }
  pause(){
      this.speed = 0;
  }
  update(){
      this.x -= this.speed;
      if(this.x < -this.w){
          _.remove(this.game.pipeArray,this);
      }
      //碰撞检测
      if(this.game.bird.x > this.x - this.game.bird.w && this.game.bird.x < this.x + this.w){
          //此时小鸟进入到了this表示的这个管子的领空
          if(this.type == 0){
              //向上的管子
              if(this.game.bird.y >= this.y - this.game.bird.h){
                  //碰撞了
                  this.game.gameover();
                  return;
              }
          }else if(this.type == 1){
              //向下的管子
              if(this.game.bird.y <= this.h){
                  //碰撞了
                  this.game.gameover();
                  return;
              }
          }
      }
  }
  render(){
      if(this.type == 0){
          //向上的管子
          this.game.ctx.drawImage(this.game.SrcManager.pipe0,0,0,this.w,this.h,this.x,this.y,this.w,this.h);
      }else if(this.type == 1){
          //向下的管子
          this.game.ctx.drawImage(this.game.SrcManager.pipe1,0,1664 - this.h,this.w,this.h,this.x,this.y,this.w,this.h);
      }
  }
}
module.exports = Pipe
