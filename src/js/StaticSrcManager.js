var $ = require("jquery")
class StaticSrcManager {
  constructor({jsonCol}){
    this.jsonCol = jsonCol
    this.imageManager = {}
  }
  loadImage(){
    var deferred = $.Deferred()
    let imgCount = this.jsonCol.length
    for (let [index,item] of this.jsonCol.entries()) {
        let image = new Image();
        image.src = item.src;
        image.index = index;
        image.onload = () => {
            this.imageManager[item.name] = image;
            if(index + 1 >= imgCount){
              deferred.resolve(this.imageManager)
            }
        }
    }
    return deferred.promise()
  }
}

module.exports = StaticSrcManager
