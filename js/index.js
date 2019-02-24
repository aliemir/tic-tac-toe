var matrix = [[0,0,0],[0,0,0],[0,0,0]];
var turn = 1;
var moveCount = 0;
var updateScreen = function(){
  for(var i = 1;i<=3;i++){
    for(var j = 1;j<=3;j++){
      if(matrix[i-1][j-1] == 1)
        $("#"+(((i-1)*3)+j)).html('<span class="oi oi-x"></span>');
      else if(matrix[i-1][j-1] == 2)
        $("#"+(((i-1)*3)+j)).html('<span class="oi oi-target"></span>');
      else if(matrix[i-1][j-1] == 0)
        $("#"+(((i-1)*3)+j)).html('<span class=""></span>');
    }
  }
};
var clear = function(){
  return [[0,0,0],[0,0,0],[0,0,0]];
};
var toggleTurn = function(){
  if(turn == 1){
   turn = 2; 
  }
  else{
    turn = 1;
  }
}
var checkGameWin = function(){
  //Row Check
  for(var i = 0;i<3;i++){
    if(matrix[i][0] == turn && matrix[i][1] == turn && matrix[i][2] == turn){
      $("#"+((i*3)+1).toString()).addClass('win-tile');
      $("#"+((i*3)+2).toString()).addClass('win-tile');
      $("#"+((i*3)+3).toString()).addClass('win-tile');
      return true;
    }
  }
  //Col Check
  for(var i = 0;i<3;i++){
    if(matrix[0][i] == turn && matrix[1][i] == turn && matrix[2][i] == turn){
      $("#"+(i+1).toString()).addClass("win-tile");
      $("#"+(i+4).toString()).addClass("win-tile");
      $("#"+(i+7).toString()).addClass("win-tile");
      return true;
    }
  }
  //Diagonal Check
  if(matrix[0][0] == turn && matrix [1][1] == turn && matrix[2][2] == turn){
      $("#1").addClass('win-tile');
      $("#5").addClass('win-tile');
      $("#9").addClass('win-tile');
    return true;
  }
  //Anti-Diagonal Check
  if(matrix[0][2] == turn && matrix [1][1] == turn && matrix[2][0] == turn){
      $("#3").addClass('win-tile');
      $("#5").addClass('win-tile');
      $("#7").addClass('win-tile');
    return true;
  }
  //Check Draw
  if(moveCount == 9){
    turn = '0';
    return true;
  }
  return false;
};
var handleMove = function(pos){
  var head = $(".head-text").text();
  console.log(head);
  if(head != "Tic-Tac-Toe"){
    console.log('game ended');
    return false;
  }
  var col = (pos-1)%3;
  var row = (pos - col - 1)/3;
  if(matrix[row][col] == 0){
    matrix[row][col] = turn;
    moveCount++;
    updateScreen();
    if(checkGameWin()){
      if(turn == 1)
        $(".head-text").text("X WINS THE GAME!!!");
      else if(turn == 2)
        $(".head-text").text("O WINS THE GAME!!!");
      else if(turn == '0')
        $(".head-text").text("-_- DRAW -_-");
      
      $("#reset-btn").removeClass("d-none");
    }else {
      toggleTurn();
    }
  } else {
    console.log("can't do this");
  }

};
var resetGame = function(){
  toggleTurn();
  moveCount = 0;
  $("#reset-btn").addClass("d-none");
  matrix = clear();
  $(".win-tile").removeClass('win-tile');
  $(".head-text").text("Tic-Tac-Toe");
  updateScreen();
};
var clickHandler = function(i){
  $("#"+i).on("click",function(){handleMove(i);});
  //return function(){
  //  handleMove(i);
  //};
};
var startGame = function(){
  for(var i = 1;i<=9;i++){
    clickHandler(i);
  }
};
$(document).ready(function(){
  $("#reset-btn").on("click",resetGame);
  startGame();
});