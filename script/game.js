var game = {
    init: function()
    {
        this.snake = snake;
        this.gameResolution = [24, 24];
        this.getNewFoodPosition();
        document.addEventListener("keydown", this.onKeyDown);
        setInterval(this.draw,1000);
    },

    draw: function()
    {

    },

    onKeyDown: function(event)
    {
        switch(e.keyCode)
        {
            case 38:
                break;
            case 40:
                break;
            case 37:
                break;
            case 39:
                break;
            case 13:
                break;
        }
    },

    getNewFoodPosition: function()
    {
        do
        {
            this.foodPosition = this.getRandomNewPositionFood();
        }while(!this.isFoodOnSnake(this.foodPosition));
    },

    getRandomNewPositionFood: function()
    {
        return[Math.round(Math.random() * this.gameResolution[0]), Math.round(Math.random() * this.gameResolution[1]),];
    },

    isFoodOnSnake: function(foodPosition)
    {
        for(var i = 0; i<this.snake.body.length; i++)
        {
            if((foodPosition[0] === this.snake.body[i][0]) && (foodPosition[1] === this.snake.body[i][1]))
            {
                return false;
            }
        }
        return true;
    },


}

game.init();
