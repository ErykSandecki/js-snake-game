
var snake = {
    vector: 'right',
    body: [
      [0,0],
    ],
};

var game = {
  init: function() {
    this.snake = snake;
    setInterval(this.draw, 1000);
    document.addEventListener("keydown", this.onKeyDown);

    this.gameResolution = [24, 24];
    this.getNewFoodPosition();
  },
  onKeyDown: function(event) {
    switch (e.keyCode) {
            case 38: //up
                if(this.snake.vector !== 'down') {
                  this.snake.vector = 'up';
                }
                break;
            case 40: //down
                break;
            case 37: //left
                break;
            case 39: //right
                break;
            case 13:
              break;
  }
},
  getNewFoodPosition: function() {
    do {
      this.foodPosition = this.getRandomFoodPosition();
    }while(!this.isFoodOnSnake(this.foodPosition));
  },
  getRandomFoodPosition: function () {
    return [
      Math.round(Math.random() * this.gameResolution[0]),
      Math.round(Math.random() * this.gameResolution[1]),
    ]
  },
  isFoodOnSnake: function(foodPosition) {
    // for po this.snake.body i sprawdzić czy współrzędne są takie same jak foodPosition
    // return true/false
  },
  moveSnake: function() {
    const newSnakeBody = [];
    // for po snake.body
    switch(this.snake.vector) {
      case 'right':
       newSnakeBody[0] = [
         this.snake.body[0][0] + 1,
         this.snake.body[0][1],
       ]
       break;
    }
    // for od 0 do length - 1
    for(var i =0; i<this.snake.body.length-1;i++){
      newSnakeBody[i+1] = this.snake.body[i];
    }
    if(this.isFoodOnSnake(this.foodPosition))
    {
      newSnakeBody.push(this.snake.body[this.snake.body.length -1]);
      this.getNewFoodPosition();
    }
    this.snake.body = newSnakeBody;
  },
  draw: function() {
    this.moveSnake();
    
    const snakeNodes = document.querSelectorAll('.game .snake');
    //usunąć snakeNodes
    // for po this.snake.body
    for(var i = 0; i<this.snake.body;i++) {
      const snakePart = this.snake.body[i];
      // tworzymy nowego node div i przypisujemy style top i left
      const snakeNode = document.createElement('div');
      snakeNode.style.left = snakePart[0] * 20;
      snakeNode.style.top = snakePart[1] * 20;
      document.querSelectorAll('.game')[0].appendChild(snakeNode);
    }
    // usunąć jedzenie i dodać z aktualnymi współrzędnymi
    // albo zakładająć że jedzenie zawsze się wyświetla to po prostu nadać nowe wartości dla top i left
    const foodNode = document.querySelector('.game .food');
    foodNode.style.left = this.foodPosition[0] * 20;
    foodNode.style.top = this.foodPosition[1] * 20;
  },
}



game.init();
