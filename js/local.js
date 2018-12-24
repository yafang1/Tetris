var Local = function() {
  //游戏对象
  var game;
  var INTERVAL = 300;
  var timer = null;
  //时间计数器
  var timeCount = 0;
  var time = 0;
  var bindkeyEvent = function() {
     document.onkeydown = function(e){
       console.log(e.keyCode)
       if(e.keyCode == 38){ //up
         game.rotate()
       }else if(e.keyCode == 39){//right
         game.right()
       }else if(e.keyCode == 40){//down
         game.down()
       }else if(e.keyCode == 37){//left
         game.left()
       }else if(e.keyCode == 32){//space
         game.fall();
       }
     }
  }
  var move = function() {
    timeFunc();
    if(!game.down()){
      game.fixed();
      var line = game.checkClear()
      if(line) {
        game.addScore(line);
      }
      var gameOver = game.checkGameOver();
      if(gameOver){
        game.gameover(false);
        stop();
      }else{
        game.performNext(generateType(),generateDir());
      }
     
    }
  }
  //随机生成干扰行
  var generataBottomLine = function(lineNum){
    var lines = [];
    for(var i=0;i<lineNum;i++){
      var line = [];
      for(var j=0;j<10;j++){
        line.push(Math.ceil(Math.random()*2)-1);
      }
      lines.push(line);
    }
    return lines;
  }
  //计时函数
  var timeFunc =  function() {
    timeCount = timeCount+1;
    if(timeCount == 5){
      timeCount = 0;
      time = time+1;
      game.setTime(time);
      if(time % 10 == 0 ){
        game.addTailLines(generataBottomLine(1))
      }
    }
  }
  var generateType = function() {
    return Math.ceil(Math.random()*7)-1;
  }
  var generateDir = function() {
    return Math.ceil(Math.random()*4)-1;
  }

  var start = function() {
    var doms = {
      gameDiv:document.getElementById('game'),
      nextDiv:document.getElementById('next'),
      timeDiv:document.getElementById('time'),
      scoreDiv:document.getElementById('score'),
      resultDiv:document.getElementById('gameover')
    }
    game = new Game();
    game.init(doms,generateType(),generateDir());
    bindkeyEvent();
    game.performNext(generateType(),generateDir());
    timer = setInterval(move,INTERVAL)
  }
  var stop = function() {
    if(timer){
      clearInterval(timer);
      timer=null;
    }
    document.onkeydown = null;
  }
  this.start = start;
}