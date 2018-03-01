var mainMenu = document.getElementById('game');

viewMenu = function ()
{
    mainMenu.style.display = "block";
}

exitGame = function ()
{
    mainMenu.style.display = "none";
    againClick = !againClick;
}