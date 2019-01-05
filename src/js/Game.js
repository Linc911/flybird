require("lodash")
var $ = require("jquery")
var StaticSrcManager = require("./StaticSrcManager")
var Background = require("./Background")
var Pipe = require("./Pipe")
var FrameUtil = require("./FrameUtil")
var Bird = require("./Bird")
class Game  {
  constructor({fps,casDom}){
    this.fps = fps
    this.casDom = casDom
    this.ctx = casDom.getContext("2d")
    this.timer = null
    this.Background = null
    this.SrcManager = null
    //管道
    this.pipeArray = []
    this.run()
  }
  initNumber(){
    this.fangzi = new Background({
      gameIns:this,
      "image" : this.SrcManager.fangzi,
      "width" : 300,
      "height" : 256,
      "speed" : 1,
      "y" : this.casDom.height - 296
    });
    this.diban = new Background({
      gameIns:this,
      "image" : this.SrcManager.diban,
      "width" : 48,
      "height" : 48,
      "speed" : 3,
      "y" : this.casDom.height - 48
    });
    this.shu = new Background({
      gameIns:this,
      "image" : this.SrcManager.shu,
      "width" : 300,
      "height" : 216,
      "speed" : 2,
      "y" : this.casDom.height - 264
    });
    this.frameUtil = new FrameUtil({gameIns:this})
    this.bird = new Bird({gameIns:this})

    // new Pipe({gameIns:this})

  }
  run(){
    new StaticSrcManager({
      jsonCol:[
            {"name" : "fangzi" , "src" : "/src/img/bg1.png"},
            {"name" : "shu" , "src" : "/src/img/bg2.png"},
            {"name" : "diban" , "src" : "/src/img/bg3.png"},
            {"name" : "bird" , "src" : "/src/img/bird.png"},
            {"name" : "blood" , "src" : "/src/img/blood.png"},
            {"name" : "die" , "src" : "/src/img/die.png"},
            {"name" : "gamebegin" , "src" : "/src/img/gamebegin.png"},
            {"name" : "gameover" , "src" : "/src/img/gameover.png"},
            {"name" : "number" , "src" : "/src/img/number.png"},
            {"name" : "pipe0" , "src" : "/src/img/pipe0.png"},
            {"name" : "pipe1" , "src" : "/src/img/pipe1.png"}
        ]
    }).loadImage().done(resData => {
      this.SrcManager = resData
      this.timer = setInterval(() => {
          this.mainloop()
      },40)
      this.initNumber()
    })
  }
  mainloop(){
    //判断当前的帧数是不是100的整数倍，如果是，那么new一个新管子
    if(!this.bird.die && (this.frameUtil.currentFrame % 80 == 0)){
        this.pipeArray.push(new Pipe({gameIns:this}));
    }
    this.ctx.clearRect(0,0,this.casDom.width,this.casDom.height)
    //房子更新、渲染
    this.fangzi.update();
    this.fangzi.render();
    //地板更新、渲染
    this.diban.update();
    this.diban.render();
    //大树的更新、渲染
    this.shu.update();
    this.shu.render();
    //鸟
    this.bird.update();
    this.bird.render();
    //
    this.frameUtil.update()
    //遍历所有的管子，让所有的管子都更新、渲染
    for(let i = 0 ; i < this.pipeArray.length ; i++){
        this.pipeArray[i].update();
        if(this.pipeArray[i]) {
            this.pipeArray[i].render();
        }
    }
  }
  pause(){
    clearInterval(this.timer)
    this.timer = null
  }
  stop(){
    this.pause()
    $("#run_game").css("display","block")
    /* setTimeout(() => {
      this.ctx.clearRect(0,0,this.casDom.width,this.casDom.height)
    },1000) */

  }
  gameover(){

    //各种暂停
    this.fangzi.pause();
    this.diban.pause();
    this.shu.pause();
    for(let i = 0 ; i < this.pipeArray.length ; i++) {
        this.pipeArray[i].pause();
    }
    //小鸟死亡
    this.bird.die = true;

  }
}

export default Game;
