/**
 * Created by hwn on 2018/12/27.
 */
import Game from "./Game.js";
require("../css/index.scss")

const $ = require("jquery");
// let ctx = $("canvas")[0].getContext("2d");
// ctx.fillRect(100,100,100,100)
class Controller {
  constructor(game){
    this.game = game
  }
  start(){
    this.game.run()
  }
  pause(){
    this.game.pause()
  }
  stop(){
    this.game.stop()
    ctrl = null;
  }
}


var runGame= $("#run_game");
runGame.click(() => {
  window.ctrl = new Controller(new Game({
    fps:16,
    casDom:$("canvas")[0]
  }))
  $("#run_game").css("display","none");
})
$("#start").click(() => {
  window.ctrl = new Controller(new Game({
    fps:16,
    casDom:$("canvas")[0]
  }))
  /* if(ctrl){
    ctrl.start()
  }else{
    ctrl = new Controller(new Game({
      fps:16,
      casDom:$("canvas")[0]
    }))
    ctrl.start()
  } */

})
$("#pause").click(() => {
  ctrl.pause()
})
$("#stop").click(() => {
  ctrl.stop()
  ctrl = null;
})
