var snake =
{
    vector : "down",
    body :[[0,0]]
};

var gameResolution;
var foodPosition;

const snakeNode = [];
init = function()
{
    gameResolution = [24,24];
    document.addEventListener("keydown", onKeyDown);
    getNewFoodPosition();
};

getNewFoodPosition = function()
{
    do
    {
        foodPosition = getRandomNewPositionFood();
    }while(!isFoodOnSnake(foodPosition));

    const fruitNode = document.getElementById('fruit')
    fruitNode.style.left = (foodPosition[0]*20).toString() + 'px';
    fruitNode.style.top = (foodPosition[1]*20).toString() + 'px';
    addDivSnake();
};

isFoodOnSnake = function(foodPosition)
{
     for(var i = 0; i<snake.body.length; i++)
     {
        return ((foodPosition[0] === snake.body[i][0]) && (foodPosition[1] === snake.body[i][1])) ? false : true;
     }
};

getRandomNewPositionFood = function()
{
    return[Math.round(Math.random() * gameResolution[0]), Math.round(Math.random() * gameResolution[1])];
};

moveSnake = function()
{
    const newSnakebody = [];

    for(var i = 0; i < snake.body.length; i++)
    {
        newSnakebody.push(snake.body[i]);
    }

    for(var i = snake.body.length - 1; i >0; i--)
    {
        newSnakebody[i]= newSnakebody[i - 1];
    }

    switch(snake.vector)
    {
        case 'up':
            newSnakebody[0] = [snake.body[0][0], snake.body[0][1] - 1];
            break;
        case 'down':
            newSnakebody[0] = [snake.body[0][0], snake.body[0][1] + 1];
            break;
        case 'left':
            newSnakebody[0] = [snake.body[0][0] - 1, snake.body[0][1]];
            break;
        case 'right':
            newSnakebody[0] = [snake.body[0][0] + 1, snake.body[0][1]];
            break;
    }

    if(isFoodOnSnake(foodPosition) === false)
    {
        newSnakebody.push(snake.body[snake.body.length - 1]);
        addDivSnake();
        getNewFoodPosition();
    }

    snake.body = newSnakebody;
    console.log(newSnakebody);
};

const onKeyDown = (e) =>
{
       switch (e.keyCode)
       {

        case 38:
            if (snake.vector !== 'down')
            {
                snake.vector = 'up';
            }
            break;
        case 40:
            if (snake.vector !== 'up')
            {
                snake.vector = 'down';
            }
            break;
        case 37:
            if (snake.vector !== 'right')
            {
                snake.vector = 'left';
            }
            break;
        case 39:
            if (snake.vector !== 'left')
            {
                snake.vector = 'right';
            }
            break;
    }
};

drawSnake = function()
{

    for(var i = 0; i < snake.body.length; i++)
    {

        snakeNode[i].style.left = (snake.body[i][0]* 20).toString() + 'px';
        snakeNode[i].style.top = (snake.body[i][1]* 20).toString() + 'px';
    }
    moveSnake();

};

addDivSnake = function()
{
    snakeNode.push(document.createElement('div'));
    snakeNode[snake.body.length - 1].style.position = "absolute";
    snakeNode[snake.body.length - 1].style.backgroundColor="black";
    snakeNode[snake.body.length - 1].style.width="20px";
    snakeNode[snake.body.length - 1].style.height="20px";
    snakeNode[snake.body.length - 1].classList.add(snake.body.length.toString());
    document.getElementById('game').appendChild(snakeNode[snake.body.length - 1]);
}


init();
setInterval(drawSnake,5000/60);
