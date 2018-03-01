email =
{
    onClick : function ()
    {
        this.textEmail = document.getElementById("getEmail").value;
        if((this.textEmail.indexOf('@',1) === -1) || (this.textEmail.indexOf('.',1) === -1))
        {
            setCssGame();
        }

        else
        {
            setCssGame();
        }
    },
};

