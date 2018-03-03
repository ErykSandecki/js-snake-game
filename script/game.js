var mainMenu = document.getElementById('game');
var againClick = false;
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

email =
{
     onClick : function ()
     {
         if(!againClick)
         {
             this.textEmail = document.getElementById("get-Email").value;
             this.badText = document.getElementById('bad-email');

             if (this.textEmail === '')
             {
                 this.badText.innerText = "Nie podałeś emaila";
             }

             else if ((this.textEmail.indexOf('@', 1) === -1) || (this.textEmail.indexOf('.', 1) === -1))
             {
                 this.badText.innerText = "Nie poprawny format";
             }

             else
             {
                 this.badText.innerText = "";
                 againClick = !againClick;
                 menuGame.viewMenu();
                 disableScroll();
             }
         }
     }
};

var menuGame =
{
    viewMenu : function ()
    {
        mainMenu.style.display = "block";
    },

    exitGame : function ()
    {
        mainMenu.style.display = "none";
        againClick = !againClick;
        enableScroll();
    },

    setViewButtonMenu : function (value)
    {
        document.getElementById('start-game').style.display = value;
        document.getElementById('instruction').style.display = value;
        document.getElementById('exit').style.display = value;
    },

    instructionGame : function ()
    {
        document.getElementById('set-picture').src = 'images/tubeInstruction.jpg';
        this.setViewButtonMenu("none");
        document.getElementById('back-instruction').style.display = "block";
    },

    backInstruction : function ()
    {
        document.getElementById('set-picture').src = 'images/tubeMenu.jpg';
        this.setViewButtonMenu("block");
        document.getElementById('back-instruction').style.display = "none";
    },
};


var snake =
{
    vector : [],
    body :[[]],
    radiusBody : ['<img src="images/snakeRadiusDegress0-90.jpg"/>','<img src="images/snakeRadiusDegress90-180.jpg"/>','<img src="images/snakeRadiusDegress180-270.jpg"/>','<img src="images/snakeRadiusDegress270-360.jpg"/>'],
};

var game =
{
    init : function()
    {
        this.snake = snake;
        document.getElementById('game').style.backgroundImage = "unset";
        menuGame.setViewButtonMenu("none");
        document.getElementById('table-points').style.display = "block";
        document.getElementById('set-picture').src = '';
        this.snake.vector = ['up','up','up'];
        this.snake.body = [[12,12],[12,13],[12,14]]
        this.snakeNode = [];
        this.radiusBodyPosition = [];
        this.numberRadiusImage = [];
        this.fruitNode = document.getElementById('fruit');
        this.addNewDiv = false;
        this.nextPressKey = true;
        this.gameResolution = [24,24];
        this.points = 0;
        this.upSpeedSnake = 6000;
        this.addPoints = false;
        this.getNewFoodPosition();
        this.addBeginBodySnake();
        this.refreshGame = setInterval(this.drawSnake.bind(game),this.upSpeedSnake/60);
    },

    getNewFoodPosition : function()
    {
        do
        {
            this.foodPosition = this.getRandomNewPositionFood();
        }while(this.isFoodOnSnake(this.foodPosition));
        this.fruitNode.innerHTML = '<img src="images/snakeLike.jpg"/>';
        this.fruitNode.style.left = (this.foodPosition[0] * 20).toString() + 'px';
        this.fruitNode.style.top = (this.foodPosition[1] * 20).toString() + 'px';
    },

    isFoodOnSnake : function(foodPosition)
    {
        for(var i = 0; i < this.snake.body.length; i++)
        {
            if((foodPosition[0] === this.snake.body[i][0]) && (foodPosition[1] === this.snake.body[i][1]))
            {
                return true;
            }
        }

        return false;
    },

    getRandomNewPositionFood : function()
    {
        return[Math.round(Math.random() * this.gameResolution[0]), Math.round(Math.random() * this.gameResolution[1])];
    },

    addBeginBodySnake : function()
    {
        for(var i = 3; i > 0; i--)
        {
            this.snakeNode.push(document.createElement('div'));
            this.snakeNode[snake.body.length - i].style.position = 'absolute';
            this.snakeNode[snake.body.length - i].style.width = '20px';
            this.snakeNode[snake.body.length - i].style.height = '20px';
            this.snakeNode[snake.body.length - i].classList.add('snakeBody');
            document.getElementById('game').appendChild(this.snakeNode[this.snake.body.length - i]);

            if(i === 3)
            {
                this.snakeNode[this.snake.body.length - i].innerHTML = '<img src="images/snakeHeadUp.jpg"/>';
            }

            else if( i === 1)
            {
                this.snakeNode[this.snake.body.length - i].innerHTML = '<img src="images/snakeTailUp.jpg"/>';
            }
            else
            {
                this.snakeNode[this.snake.body.length - i].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
            }
        }

        for(var i = 0; i < snake.body.length; i++)
        {
            this.snakeNode[i].style.left = (this.snake.body[i][0] * 20).toString() + 'px';
            this.snakeNode[i].style.top = (this.snake.body[i][1] * 20).toString() + 'px';
        }
    },

    moveSnake : function()
    {
        const newSnakebody = [];
        const newVector  = [];

        for(var i = 0; i < this.snake.body.length; i++)
        {
            newSnakebody.push(this.snake.body[i]);
            newVector.push(this.snake.vector[i]);
        }

        for(var i = this.snake.body.length - 1; i > 0; i--)
        {
            newSnakebody[i]= newSnakebody[i - 1];
            newVector[i] = newVector[i - 1];
        }

        switch(this.snake.vector[0])
        {
            case 'up':
                newSnakebody[0] = [this.snake.body[0][0], this.snake.body[0][1] - 1];
                break;
            case 'down':
                newSnakebody[0] = [this.snake.body[0][0], this.snake.body[0][1] + 1];
                break;
            case 'left':
                newSnakebody[0] = [this.snake.body[0][0] - 1, this.snake.body[0][1]];
                break;
            case 'right':
                newSnakebody[0] = [this.snake.body[0][0] + 1, this.snake.body[0][1]];
                break;
        }

        if(this.isFoodOnSnake(this.foodPosition))
        {
            newSnakebody.push(this.snake.body[this.snake.body.length - 1]);
            newVector.push(this.snake.vector[this.snake.vector. length - 1]);
            this.getNewFoodPosition();
            this.addNewDiv = !this.addNewDiv;
            this.points += 10;
            this.addPoints = !this.addPoints;
        }

        this.snake.body = newSnakebody;
        this.snake.vector = newVector;

        if(this.addNewDiv)
        {
            this.addNewDiv = !this.addNewDiv;
            this.addDivSnake();
            this.snakeNode[this.snake.body.length - 1].style.left = (this.snake.body[this.snake.body.length - 2][0]* 20).toString() + 'px';
            this.snakeNode[this.snake.body.length - 1].style.top = (this.snake.body[this.snake.body.length - 2][1]* 20).toString() + 'px';
        }
    },

    setRadiusBodySnake : function (vectorActually, vectorSet)
    {
        if(((vectorActually === 'up') && (vectorSet === 'left')) || ((vectorActually === 'right') && (vectorSet === 'down')))
        {
            this.numberRadiusImage.push(0);
        }

        else if(((vectorActually === 'down') && (vectorSet === 'left')) || ((vectorActually === 'right') && (vectorSet === 'up')))
        {
            this.numberRadiusImage.push(1);
        }

        else if(((vectorActually === 'left') && (vectorSet === 'up')) || ((vectorActually === 'down') && (vectorSet === 'right')))
        {
            this.numberRadiusImage.push(2);
        }

        else
        {
            this.numberRadiusImage.push(3);
        }

        this.radiusBodyPosition.push([this.snake.body[0][0],this.snake.body[0][1]]);
    },

    drawSnake : function()
    {
        for(var i = 0; i < this.snake.body.length; i++)
        {
            this.snakeNode[i].style.left = (this.snake.body[i][0]* 20).toString() + 'px';
            this.snakeNode[i].style.top = (this.snake.body[i][1]* 20).toString() + 'px';
            this.changeDivImg(i);
        }
        document.getElementById('player-points').innerText = "Points : " + this.points;
        this.moveSnake();
        this.onYourOwnBody();
        this.onWallSnake();

        if(!this.nextPressKey)
        {
            this.nextPressKey = !this.nextPressKey;
        }
        if(this.addPoints)
        {
            this.upSpeedSnake -= 25;
            this.addPoints = !this.addPoints;
            clearInterval(this.refreshGame);
            this.refreshGame = setInterval(this.drawSnake.bind(game), this.upSpeedSnake/60);
        }
    },

    onYourOwnBody : function ()
    {
        for(var i = 1; i < this.snake.body.length; i++)
        {
            if((this.snake.body[0][0] === this.snake.body[i][0]) && (this.snake.body[0][1] === this.snake.body[i][1]))
            {
                clearInterval(this.refreshGame);
                this.clearTimeDeleteDiv = setTimeout(this.onDeleteDiv.bind(game), 2000);
            }
        }
    },

    onDeleteDiv : function ()
    {
        for(var i = 0; i < this.snakeNode.length; i++)
        {
            document.getElementById('game').removeChild(this.snakeNode[i]);
        }

        menuGame.setViewButtonMenu('block');
        document.getElementById('set-picture').src = 'images/tubeMenu.jpg';
        this.fruitNode.innerHTML = '<img src=""/>';
        clearTimeout(this.clearTimeDeleteDiv);
        document.getElementById('table-points').style.display = "none";
    },

    onWallSnake : function()
    {
        if(this.snake.body[0][0] > 24)
        {
            this.snake.body[0][0] = 0;
        }

        else if(this.snake.body[0][0] < 0)
        {
            this.snake.body[0][0] = 24;
        }

        else if(this.snake.body[0][1] > 24)
        {
            this.snake.body[0][1] = 0;
        }

        else if(this.snake.body[0][1] < 0)
        {
            this.snake.body[0][1] = 24;
        }
    },

    changeDivImg : function (number)
    {
        if(number === this.snake.vector.length - 1)
        {
            if(this.onRadiusBody(this.snake.body[number]))
            {
                this.numberRadiusImage.shift();
                this.radiusBodyPosition.shift();
            }

            if(this.snake.vector[this.snake.vector.length - 1] === 'up')
            {
                this.snakeNode[this.snake.vector.length - 1].innerHTML = '<img src="images/snakeTailUp.jpg"/>';
            }

            else if(this.snake.vector[this.snake.vector.length - 1] === 'down')
            {
                this.snakeNode[this.snake.vector.length - 1].innerHTML = '<img src="images/snakeTailDown.jpg"/>';
            }

            else if(this.snake.vector[this.snake.vector.length - 1] === 'left')
            {
                this.snakeNode[this.snake.vector.length - 1].innerHTML = '<img src="images/snakeTailLeft.jpg"/>';
            }

            else
            {
                this.snakeNode[this.snake.vector.length - 1].innerHTML = '<img src="images/snakeTailRight.jpg"/>';
            }
        }

        else if(number === 0)
        {
            if(this.snake.vector[0] === 'up')
            {
                this.snakeNode[0].innerHTML = '<img src="images/snakeHeadUp.jpg"/>';
            }

            else if(this.snake.vector[0] === 'down')
            {
                this.snakeNode[0].innerHTML = '<img src="images/snakeHeadDown.jpg"/>';
            }

            else if(this.snake.vector[0] === 'left')
            {
                this.snakeNode[0].innerHTML = '<img src="images/snakeHeadLeft.jpg"/>';
            }

            else
            {
                this.snakeNode[0].innerHTML = '<img src="images/snakeHeadRight.jpg"/>';
            }
        }

        else if(this.onRadiusBody(this.snake.body[number]))
        {
            this.snakeNode[number].innerHTML = this.snake.radiusBody[this.numberRadiusImage[this.numberRadius]];
        }

        else if((this.snake.vector[number] === 'left') || (this.snake.vector[number] === 'right'))
        {
            this.snakeNode[number].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
        }

        else
        {
            this.snakeNode[number].innerHTML = '<img src="images/snakeBodyLengthVertical.jpg"/>';
        }
    },

    onRadiusBody : function(snakeBody)
    {
        for(var i = 0; i < this.radiusBodyPosition.length; i++)
        {
            if((snakeBody[0] === this.radiusBodyPosition[i][0]) && (snakeBody[1] === this.radiusBodyPosition[i][1]))
            {
                this.numberRadius = i;
                return true;
            }
        }
        return false;
    },

    addDivSnake : function()
    {
        this.snakeNode.push(document.createElement('div'));
        this.snakeNode[this.snake.body.length - 1].style.position = 'absolute';
        this.snakeNode[this.snake.body.length - 1].style.width = '20px';
        this.snakeNode[this.snake.body.length - 1].style.height = '20px';
        document.getElementById('game').appendChild(this.snakeNode[this.snake.body.length - 1]);

        if ((this.snake.vector[this.snake.vector.length - 2] === 'up') || (this.snake.vector[this.snake.vector.length - 2] === 'down'))
        {
            this.snakeNode[this.snake.body.length - 1].innerHTML = '<img src="images/snakeBodyLengthVertical.jpg"/>';
        }

        else
        {
            this.snakeNode[this.snake.body.length - 1].innerHTML = '<img src="images/snakeBodyLengthHorizontally.jpg"/>';
        }
    },
};

 const onKeyDown = (e) =>
{
    if(game.nextPressKey)
    {
        switch (e.keyCode)
        {
            case 38:
                if ((game.snake.vector[0] !== 'down') && (game.snake.vector[0] !== 'up'))
                {
                    game.setRadiusBodySnake(game.snake.vector[0],'up');
                    game.snake.vector[0] = 'up';
                }
                break;

            case 40:
                if ((game.snake.vector[0] !== 'up') && (game.snake.vector[0] !== 'down'))
                {
                    game.setRadiusBodySnake(game.snake.vector[0],'down');
                    game.snake.vector[0] = 'down';
                }
                break;

            case 37:
                if ((game.snake.vector[0] !== 'right') && (game.snake.vector[0] !== 'left'))
                {
                    game.setRadiusBodySnake(game.snake.vector[0],'left');
                    game.snake.vector[0] = 'left';
                }
                break;

            case 39:
                if ((game.snake.vector[0] !== 'left') && (game.snake.vector[0] !== 'right'))
                {
                    game.setRadiusBodySnake(game.snake.vector[0],'right');
                    game.snake.vector[0] = 'right';
                }
                break;

            case 27:
                clearInterval(game.refreshGame);
                game.onDeleteDiv();
                break;
        }

        game.nextPressKey = !game.nextPressKey;
    }
}

function preventDefault(e)
{
    e = e || window.event;

    if (e.preventDefault)
    {
        e.preventDefault();
    }

    e.returnValue = false;
}

function preventDefaultForScrollKeys(e)
{
    if (keys[e.keyCode])
    {
        preventDefault(e);
        return false;
    }
}

function disableScroll()
{
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll()
{
    window.onwheel = true;
    window.ontouchmove = true;
    document.onkeydown = true;
}

document.addEventListener('keydown', onKeyDown);


