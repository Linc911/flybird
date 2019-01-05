class FrameUtil {
  constructor(){
      this.currentFrame = 0;
      this.realFps = 0;
      this.sFrame = 0;
      this.sTime = new Date();
  }
  update(){
      this.currentFrame++;
      var t = new Date();
      if(t - this.sTime >= 1000){
          this.realFps = this.currentFrame - this.sFrame;
          this.sFrame = this.currentFrame;
          this.sTime = t;
      }
  }
}
module.exports = FrameUtil
