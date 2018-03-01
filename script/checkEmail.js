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
                viewMenu();
                disableScroll();
            }
        }
    }
};

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