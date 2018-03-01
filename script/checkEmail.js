email =
{
    onClick : function ()
    {
        this.textEmail = document.getElementById("get-Email").value;
        this.badText = document.getElementById('bad-email');
        this.badText.style.color = "red";
        this.badText.style.textAlign = "center";

        if(this.textEmail === '')
        {
            this.badText.innerText = "Nie podałeś emaila";
        }

        else if((this.textEmail.indexOf('@',1) === -1) || (this.textEmail.indexOf('.',1) === -1))
        {
            this.badText.innerText = "Nie poprawny format";
        }

        else
        {
            this.badText.innerText = "";
            setCssGame();
        }
    },
};

