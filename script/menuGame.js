var mainMenu = document.getElementById('game');

viewMenu = function ()
{
    mainMenu.style.display = "block";
};

exitGame = function ()
{
    mainMenu.style.display = "none";
    againClick = !againClick;
    enableScroll();
};

setViewButtonMenu = function (value)
{
    document.getElementById('start-game').style.display = value;
    document.getElementById('instruction').style.display = value;
    document.getElementById('exit').style.display = value;
};

instructionGame = function ()
{
  document.getElementById('set-picture').src = 'images/tubeInstruction.jpg';
  setViewButtonMenu("none");
  document.getElementById('back-instruction').style.display = "block";
};

backInstruction = function ()
{
    document.getElementById('set-picture').src = 'images/tubeMenu.jpg';
    setViewButtonMenu("block");
    document.getElementById('back-instruction').style.display = "none";
};

