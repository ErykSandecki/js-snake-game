const fruitNode = document.getElementById('fruit');
var clearTimeDeleteDiv;
var refreshGame;
var snakeNode;
var radiusBodyPosition;
var numberRadiusImage;
var gameResolution;
var foodPosition;
var addNewDiv;
var numberRadius;
var nextPressKey;
var points;
var upSpeedSnake;
var addPoints;

var snake =
    {
        vector : [],
        body :[[]],
        radiusBody : ['<img src="images/snakeRadiusDegress0-90.jpg"/>','<img src="images/snakeRadiusDegress90-180.jpg"/>','<img src="images/snakeRadiusDegress180-270.jpg"/>','<img src="images/snakeRadiusDegress270-360.jpg"/>'],
    };

//Set Css in div class play, game, fruit after correct entry email//

init = function()
{
    document.getElementById('game').style.backgroundImage = "unset";
    setViewButtonMenu("none");
    document.getElementById('table-points').style.display = "block";
    document.getElementById('set-picture').src = '';
    snake.vector = ['up','up','up'];
    snake.body = [[12,12],[12,13],[12,14]]
    snakeNode = [];
    radiusBodyPosition = [];
    numberRadiusImage = [];
    addNewDiv = false;
    nextPressKey = true;
    gameResolution = [24,24];
    points = 0;
    upSpeedSnake = 6000;
    addPoints = false;
    getNewFoodPosition();
    addBeginBodySnake();
    refreshGame = setInterval(drawSnake,upSpeedSnake/60);
};

hideButtonMenu = function ()
{
    document.getElementById('start-game').style.display = "none";
    document.getElementById('instruction').style.display = "none";
    document.getElementById('exit').style.display = "none";
};

getNewFoodPosition = function()
{
    do
    {
        foodPosition = getRandomNewPositionFood();
    }while(isFoodOnSnake(foodPosition));
    fruitNode.innerHTML = '<img src="images/snakeLike.jpg"/>';
    fruitNode.style.left = (foodPosition[0] * 20).toString() + 'px';
    fruitNode.style.top = (foodPosition[1] * 20).toString() + 'px';
};

isFoodOnSnake = function(foodPosition)
{
     for(var i = 0; i < snake.body.length; i++)
     {
        if((foodPosition[0] === snake.body[i][0]) && (foodPosition[1] === snake.body[i][1]))
         {
             return true;
         }
     }

     return false;
};

getRandomNewPositionFood = function()
{
    return[Math.round(Math.random() * gameResolution[0]), Math.round(Math.random() * gameResolution[1])];
};

addBeginBodySnake = function()
{
    for(var i = 3; i > 0; i--)
    {
        snakeNode.push(document.createElement('div'));
        snakeNode[snake.body.length - i].style.position = 'absolute';
        snakeNode[snake.body.length - i].style.width = '20px';
        snakeNode[snake.body.length - i].style.height = '20px';
        snakeNode[snake.body.length - i].classList.add('snakeBody');
        document.getElementById('game').appendChild(snakeNode[snake.body.length - i]);

        if(i === 3)
        {
            snakeNode[snake.body.length - i].innerHTML = '<img src="images/snakeHeadUp.jpg"/>';
        }

        else if( i === 1)
        {
            snakeNode[snake.body.length - i].innerHTML = '<img src="images/snakeTailUp.jpg"/>';
        }
        else
        {
            snakeNode[snake.body.length - i].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
        }
    }

    for(var i = 0; i < snake.body.length; i++)
    {
        snakeNode[i].style.left = (snake.body[i][0] * 20).toString() + 'px';
        snakeNode[i].style.top = (snake.body[i][1] * 20).toString() + 'px';
    }
};

moveSnake = function()
{
    const newSnakebody = [];
    const newVector  = [];

    for(var i = 0; i < snake.body.length; i++)
    {
        newSnakebody.push(snake.body[i]);
        newVector.push(snake.vector[i]);
    }

    for(var i = snake.body.length - 1; i > 0; i--)
    {
        newSnakebody[i]= newSnakebody[i - 1];
        newVector[i] = newVector[i - 1];
    }

    switch(snake.vector[0])
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

    if(isFoodOnSnake(foodPosition))
    {
        newSnakebody.push(snake.body[snake.body.length - 1]);
        newVector.push(snake.vector[snake.vector. length - 1]);
        getNewFoodPosition();
        addNewDiv = !addNewDiv;
        points += 10;
        addPoints = !addPoints;
    }

    snake.body = newSnakebody;
    snake.vector = newVector;

    if(addNewDiv)
    {
        addNewDiv = !addNewDiv;
        addDivSnake();
        snakeNode[snake.body.length - 1].style.left = (snake.body[snake.body.length - 2][0]* 20).toString() + 'px';
        snakeNode[snake.body.length - 1].style.top = (snake.body[snake.body.length - 2][1]* 20).toString() + 'px';
    }
};

setRadiusBodySnake = function (vectorActually, vectorSet)
{
    if(((vectorActually === 'up') && (vectorSet === 'left')) || ((vectorActually === 'right') && (vectorSet === 'down')))
    {
        numberRadiusImage.push(0);
    }

    else if(((vectorActually === 'down') && (vectorSet === 'left')) || ((vectorActually === 'right') && (vectorSet === 'up')))
    {
        numberRadiusImage.push(1);
    }

    else if(((vectorActually === 'left') && (vectorSet === 'up')) || ((vectorActually === 'down') && (vectorSet === 'right')))
    {
        numberRadiusImage.push(2);
    }

    else
    {
        numberRadiusImage.push(3);
    }

    radiusBodyPosition.push([snake.body[0][0],snake.body[0][1]]);
};

const onKeyDown = (e) =>
{
        if(nextPressKey)
        {
            switch (e.keyCode)
            {
                case 38:
                    if ((snake.vector[0] !== 'down') && (snake.vector[0] !== 'up'))
                    {
                        setRadiusBodySnake(snake.vector[0],'up');
                        snake.vector[0] = 'up';
                    }
                    break;

                case 40:
                    if ((snake.vector[0] !== 'up') && (snake.vector[0] !== 'down'))
                    {
                        setRadiusBodySnake(snake.vector[0],'down');
                        snake.vector[0] = 'down';
                    }
                    break;

                case 37:
                    if ((snake.vector[0] !== 'right') && (snake.vector[0] !== 'left'))
                    {
                        setRadiusBodySnake(snake.vector[0],'left');
                        snake.vector[0] = 'left';
                    }
                    break;

                case 39:
                    if ((snake.vector[0] !== 'left') && (snake.vector[0] !== 'right'))
                    {
                        setRadiusBodySnake(snake.vector[0],'right');
                        snake.vector[0] = 'right';
                    }
                    break;

                case 27:
                    clearInterval(refreshGame);
                    onDeleteDiv();
                    break;
            }

            nextPressKey = !nextPressKey;
        }
};

drawSnake = function()
{
    for(var i = 0; i < snake.body.length; i++)
    {
        snakeNode[i].style.left = (snake.body[i][0]* 20).toString() + 'px';
        snakeNode[i].style.top = (snake.body[i][1]* 20).toString() + 'px';
        changeDivImg(i);
    }
    document.getElementById('player-points').innerText = "Points : " + points;
    moveSnake();
    onYourOwnBody();
    onWallSnake();

    if(!nextPressKey)
    {
        nextPressKey = !nextPressKey;
    }
    if(addPoints)
    {
        upSpeedSnake -= 25;
        addPoints = !addPoints;
        clearInterval(refreshGame);
        refreshGame = setInterval(drawSnake,upSpeedSnake/60);
    }
};

onYourOwnBody = function ()
{
    for(var i = 1; i < snake.body.length; i++)
    {
        if((snake.body[0][0] === snake.body[i][0]) && (snake.body[0][1] === snake.body[i][1]))
        {
            clearInterval(refreshGame);
            clearTimeDeleteDiv = setTimeout(onDeleteDiv, 2000);
        }
    }
};

onDeleteDiv = function ()
{
    for(var i = 0; i < snakeNode.length; i++)
    {
        document.getElementById('game').removeChild(snakeNode[i]);
    }

    setViewButtonMenu('block');
    document.getElementById('set-picture').src = 'images/tubeMenu.jpg';
    fruitNode.innerHTML = '<img src=""/>';
    clearTimeout(clearTimeDeleteDiv);
    document.getElementById('table-points').style.display = "none";
};

onWallSnake = function()
{
    if(snake.body[0][0] > 24)
    {
        snake.body[0][0] = 0;
    }

    else if(snake.body[0][0] < 0)
    {
        snake.body[0][0] = 24;
    }

    else if(snake.body[0][1] > 24)
    {
        snake.body[0][1] = 0;
    }

    else if(snake.body[0][1] < 0)
    {
        snake.body[0][1] = 24;
    }

};

changeDivImg = function (number)
{
    if(number === snake.vector.length - 1)
    {
        if(onRadiusBody(snake.body[number]))
        {
            numberRadiusImage.shift();
            radiusBodyPosition.shift();
        }

        if(snake.vector[snake.vector.length - 1] === 'up')
        {
          snakeNode[snake.vector.length - 1].innerHTML = '<img src="images/snakeTailUp.jpg"/>';
        }

        else if(snake.vector[snake.vector.length - 1] === 'down')
        {
          snakeNode[snake.vector.length - 1].innerHTML = '<img src="images/snakeTailDown.jpg"/>';
        }

        else if(snake.vector[snake.vector.length - 1] === 'left')
        {
          snakeNode[snake.vector.length - 1].innerHTML = '<img src="images/snakeTailLeft.jpg"/>';
        }

        else
        {
           snakeNode[snake.vector.length - 1].innerHTML = '<img src="images/snakeTailRight.jpg"/>';
        }
    }

    else if(number === 0)
    {
        if(snake.vector[0] === 'up')
        {
           snakeNode[0].innerHTML = '<img src="images/snakeHeadUp.jpg"/>';
        }

        else if(snake.vector[0] === 'down')
        {
           snakeNode[0].innerHTML = '<img src="images/snakeHeadDown.jpg"/>';
        }

        else if(snake.vector[0] === 'left')
        {
          snakeNode[0].innerHTML = '<img src="images/snakeHeadLeft.jpg"/>';
        }

        else
        {
          snakeNode[0].innerHTML = '<img src="images/snakeHeadRight.jpg"/>';
        }
    }

    else if(onRadiusBody(snake.body[number]))
    {
         snakeNode[number].innerHTML = snake.radiusBody[numberRadiusImage[numberRadius]];
    }

    else if((snake.vector[number] === 'left') || (snake.vector[number] === 'right'))
    {
        snakeNode[number].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
    }

    else
    {
        snakeNode[number].innerHTML = '<img src="images/snakeBodyLengthVertical.jpg"/>';
    }
};

onRadiusBody = function(snakeBody)
{
    for(var i = 0; i < radiusBodyPosition.length; i++)
    {
        if((snakeBody[0] === radiusBodyPosition[i][0]) && (snakeBody[1] === radiusBodyPosition[i][1]))
        {
            numberRadius = i;
            return true;
        }
    }
    return false;
};

addDivSnake = function()
{
    snakeNode.push(document.createElement('div'));
    snakeNode[snake.body.length - 1].style.position = 'absolute';
    snakeNode[snake.body.length - 1].style.width = '20px';
    snakeNode[snake.body.length - 1].style.height = '20px';
    document.getElementById('game').appendChild(snakeNode[snake.body.length - 1]);

    if((snake.vector[snake.vector.length - 2] === 'up') || (snake.vector[snake.vector.length - 2] === 'down'))
    {
        snakeNode[snake.body.length - 1].innerHTML = '<img src="images/snakeBodyLengthVertical.jpg"/>';
    }

    else
    {
        snakeNode[snake.body.length - 1].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
    }

};

document.addEventListener('keydown', onKeyDown);


