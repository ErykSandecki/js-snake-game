const canvas = document.querySelector('canvas');
const image_snake_tail = new Image();
const image_menu = [];
const content_area = canvas.getContext('2d');
const head_snake_x = [0,21];
const head_snake_y = [21,42];
const body_snake_x = [0,21];
const body_snake_y = 0;
const tail_snake_x = [84,105];
const tail_snake_y = [0,21];
const direction =["Up", "Down" , "Left", "Right"];
const position_map_x = [];
const position_map_y = [];

canvas.width = 500;
canvas.height = 500;

for(var i = 0; i < 9; i++)
{
    image_menu.push(new Image());
}

image_snake_tail.src="images/Snake_Tail.jpg";
image_menu[0].src = "images/Menu.gif";
image_menu[1].src = "images/Menu_hover_play.gif";
image_menu[2].src = "images/Menu_hover_instruction.gif";
image_menu[3].src = "images/sky.jpg";
image_menu[4].src = "images/cloud_1.gif";
image_menu[5].src = "images/cloud_2.gif";
image_menu[6].src = "images/clouds_3.gif";
image_menu[7].src ="images/Instruction.gif";
image_menu[8].src ="images/Instruction_hover.gif";

var press_exit = false;
var game_over = false;
var time_to_start = '3';
var timer_start = 30;
var begin_game = true;
var timer = 60;
var points = 0;
var accepted_click = true;
var main_menu = true;
var topCanvas = canvas.offsetTop;
var leftCanvas = canvas.offsetLeft;
var move_image_cloud_1 = 0;
var move_image_cloud_2 = 150;
var move_image_cloud_3 = 400;
var hover_position = 0;
var pos_cursor_x;
var pos_cursor_y;
var refresh_menu;
var refresh_game;
var game_start = false;
var actually_status_head_snake_x = head_snake_x[0];
var actually_status_head_snake_y = head_snake_y[1];
var actually_direction_head_snake = "Up";
var pos_snake_head_x = canvas.width / 2 + 10;
var pos_snake_head_y = canvas.height / 2 + 10;
var actually_status_body_snake_x = [body_snake_x[1]];
var actually_status_body_snake_y = body_snake_y;
var actually_direction_body_snake = [actually_direction_head_snake];
var pos_snake_body_x = [pos_snake_head_x];
var pos_snake_body_y = [pos_snake_head_y + 20];
var actually_status_tail_snake_x = tail_snake_x[0];
var actually_status_tail_snake_y = tail_snake_y[0];
var pos_snake_tail_x = pos_snake_head_x;
var pos_snake_tail_y = pos_snake_head_y + 40;
var actually_direction = direction[0];
var rotate_position_body_snake_x = [] ;
var rotate_position_body_snake_y = [];
var direction_rotate_position_body_snake = [];
var set_direction = true;
var random_a_new_like = true;
var position_on_radius_body = false;
var x;
var y;

function Restart()
{
    actually_status_head_snake_x = head_snake_x[0];
    actually_status_head_snake_y = head_snake_y[1];
    actually_direction_head_snake = "Up";
    pos_snake_head_x = canvas.width / 2 + 10;
    pos_snake_head_y = canvas.height / 2 + 10;
    actually_status_body_snake_x = [body_snake_x[1]];
    actually_status_body_snake_y = body_snake_y;
    actually_direction_body_snake = [actually_direction_head_snake];
    pos_snake_body_x = [pos_snake_head_x];
    pos_snake_body_y = [pos_snake_head_y + 20];
    actually_status_tail_snake_x = tail_snake_x[0];
    actually_status_tail_snake_y = tail_snake_y[0];
    pos_snake_tail_x = pos_snake_head_x;
    pos_snake_tail_y = pos_snake_head_y + 40;
    actually_direction = direction[0];
    rotate_position_body_snake_x = [] ;
    rotate_position_body_snake_y = [];
    direction_rotate_position_body_snake = [];
    set_direction = true;
    random_a_new_like = true;
    position_on_radius_body = false;
    points = 0;
    timer = 60.0;
    begin_game = true;
    timer_start = 30;
    time_to_start = '3';
    press_exit = false;
}

function Draw_Snake()
{
    // Draw a like//
    content_area.drawImage(image_snake_tail, 42, 42, 20, 20, x, y, 20, 20);

     //Draw head //
    if(set_direction === false)
    {
        if(actually_direction === "Up")
        {
            content_area.drawImage(image_snake_tail, actually_status_head_snake_x, actually_status_head_snake_y, 20, 20, pos_snake_head_x, pos_snake_head_y - 20, 20, 20);
        }

        else if(actually_direction === "Down")
        {
            content_area.drawImage(image_snake_tail, actually_status_head_snake_x, actually_status_head_snake_y, 20, 20, pos_snake_head_x, pos_snake_head_y + 20 , 20, 20);
        }

        else if(actually_direction === "Left")
        {
            content_area.drawImage(image_snake_tail, actually_status_head_snake_x, actually_status_head_snake_y, 20, 20, pos_snake_head_x - 20, pos_snake_head_y, 20, 20);
        }

        else
        {
            content_area.drawImage(image_snake_tail, actually_status_head_snake_x, actually_status_head_snake_y, 20, 20, pos_snake_head_x + 20, pos_snake_head_y, 20, 20);
        }
    }

    else
    {
        content_area.drawImage(image_snake_tail, actually_status_head_snake_x, actually_status_head_snake_y, 20, 20, pos_snake_head_x, pos_snake_head_y, 20, 20);
    }

     // Draw body //
    for(var i = 0; i < pos_snake_body_x.length; i++)
    {
        for(var j = 0; j < direction_rotate_position_body_snake.length; j++)
        {
            if((pos_snake_body_x[i] === rotate_position_body_snake_x[j]) && (pos_snake_body_y[i] === rotate_position_body_snake_y[j]))
            {
                if((direction_rotate_position_body_snake[j] === "Left-Up") || (direction_rotate_position_body_snake[j] === "Right-Up")||(direction_rotate_position_body_snake[j] === "Left-Down")||(direction_rotate_position_body_snake[j] === "Right-Down"))
                {
                    actually_status_body_snake_x[i] = body_snake_x[1];
                }

                else
                {
                    actually_status_body_snake_x[i] = body_snake_x[0];
                }

                position_on_radius_body = true;
            }
        }
        if(position_on_radius_body === false)
        {
            content_area.drawImage(image_snake_tail, actually_status_body_snake_x[i], actually_status_body_snake_y, 20, 20, pos_snake_body_x[i], pos_snake_body_y[i], 20, 20);
        }

        position_on_radius_body = false;
    }

    // Draw tail//
    for(var j = 0; j < direction_rotate_position_body_snake.length; j++)
    {
        if((pos_snake_tail_x === rotate_position_body_snake_x[j]) && (pos_snake_tail_y === rotate_position_body_snake_y[j]))
        {
            if((direction_rotate_position_body_snake[j] ==="Left-Up") || (direction_rotate_position_body_snake[j] ==="Right-Up"))
            {
                actually_status_tail_snake_x = tail_snake_x[0];
                actually_status_tail_snake_y = tail_snake_y[0];
            }

            else if ((direction_rotate_position_body_snake[j] ==="Left-Down") || (direction_rotate_position_body_snake[j] ==="Right-Down"))
            {
                actually_status_tail_snake_x = tail_snake_x[0];
                actually_status_tail_snake_y = tail_snake_y[1];
            }

            else if ((direction_rotate_position_body_snake[j] ==="Up-Left") || (direction_rotate_position_body_snake[j] ==="Down-Left"))
            {
                actually_status_tail_snake_x = tail_snake_x[1];
                actually_status_tail_snake_y = tail_snake_y[1];
            }

            else
            {
                actually_status_tail_snake_x = tail_snake_x[1];
                actually_status_tail_snake_y = tail_snake_y[0];
            }

            direction_rotate_position_body_snake.splice(0,1);
            rotate_position_body_snake_x.splice(0,1);
            rotate_position_body_snake_y.splice(0,1);
        }
    }

    content_area.drawImage(image_snake_tail, actually_status_tail_snake_x, actually_status_tail_snake_y, 20, 20, pos_snake_tail_x, pos_snake_tail_y, 20, 20);

    //Draw rotate body//
        for(var i = 0; i<direction_rotate_position_body_snake.length;i++)
        {
            if((direction_rotate_position_body_snake[i] === "Left-Up") || (direction_rotate_position_body_snake[i] === "Down-Right"))
            {
                content_area.drawImage(image_snake_tail, 42, 21, 20 , 20, rotate_position_body_snake_x[i], rotate_position_body_snake_y[i],20 , 20);
            }

            else if ((direction_rotate_position_body_snake[i] === "Right-Up") || (direction_rotate_position_body_snake[i] === "Down-Left"))
            {
                content_area.drawImage(image_snake_tail, 63, 21, 20 , 20, rotate_position_body_snake_x[i], rotate_position_body_snake_y[i],20 , 20);
            }

            else if ((direction_rotate_position_body_snake[i] === "Left-Down") || (direction_rotate_position_body_snake[i] === "Up-Right"))
            {
                content_area.drawImage(image_snake_tail, 42, 0, 20 , 20, rotate_position_body_snake_x[i], rotate_position_body_snake_y[i],20 , 20);
            }

            else
            {
                content_area.drawImage(image_snake_tail, 63, 0, 20 , 20, rotate_position_body_snake_x[i], rotate_position_body_snake_y[i],20 , 20);
            }
        }
}

function Move()
{
    pos_snake_tail_y = pos_snake_body_y[pos_snake_body_y.length - 1];
    pos_snake_tail_x = pos_snake_body_x[pos_snake_body_x.length - 1];

    for(var i = pos_snake_body_y.length - 1; i >= 0; i--)
    {
        if(i === 0)
        {
            pos_snake_body_y[i] = pos_snake_head_y;
            pos_snake_body_x[i] = pos_snake_head_x;
            actually_direction_body_snake[i] = actually_direction_head_snake;
        }

        else
        {
            pos_snake_body_y[i] = pos_snake_body_y[i - 1];
            pos_snake_body_x[i] = pos_snake_body_x[i - 1];
            actually_direction_body_snake[i]= actually_direction_body_snake[i - 1];
        }
    }

    if(actually_direction === "Up")
    {
        if(pos_snake_head_y === 0)
        {
            pos_snake_head_y = 480;
        }
        else
        {
            pos_snake_head_y -= 20;
        }

        actually_direction_head_snake = "Up";
    }

    else if(actually_direction === "Down")
    {
        if(pos_snake_head_y === 480)
        {
            pos_snake_head_y = 0;
        }
        else
        {
            pos_snake_head_y += 20;
        }
        actually_direction_head_snake = "Down";
    }

    else if(actually_direction === "Left")
    {
        if(pos_snake_head_x === 0)
        {
            pos_snake_head_x = 480;
        }

        else
        {
            pos_snake_head_x -= 20;
        }
        actually_direction_head_snake = "Left";
    }

    else
    {
        if(pos_snake_head_x === 480)
        {
            pos_snake_head_x = 0;
        }
        else
        {
            pos_snake_head_x += 20;
        }
        actually_direction_head_snake = "Right";
    }
}

function Board()
{
    content_area.fillStyle = "black";
    content_area.fillRect(0,0,500,500);
}

const Change_Position = (e) =>
{
    if(set_direction === true)
    {
        switch (e.keyCode) {
            case 38:
                if ((actually_direction !== "Up") && (actually_direction !== "Down")) {
                    if (actually_direction === "Left") {
                        direction_rotate_position_body_snake.push("Left-Up");
                    }

                    else
                    {
                        direction_rotate_position_body_snake.push("Right-Up");
                    }
                    actually_direction = direction[0];
                    rotate_position_body_snake_x.push(pos_snake_head_x);
                    rotate_position_body_snake_y.push(pos_snake_head_y);
                    actually_status_head_snake_x = head_snake_x[0];
                    actually_status_head_snake_y = head_snake_y[1];
                    set_direction = false;
                }
                break;
            case 40:
                if ((actually_direction !== "Down") && (actually_direction !== "Up"))
                {
                    if (actually_direction === "Left")
                    {
                        direction_rotate_position_body_snake.push("Left-Down");
                    }

                    else
                    {
                        direction_rotate_position_body_snake.push("Right-Down");
                    }

                    actually_direction = direction[1];
                    rotate_position_body_snake_x.push(pos_snake_head_x);
                    rotate_position_body_snake_y.push(pos_snake_head_y);
                    actually_status_head_snake_x = head_snake_x[0];
                    actually_status_head_snake_y = head_snake_y[0];
                    set_direction = false;
                }
                break;

            case 37:
                if ((actually_direction !== "Left") && (actually_direction !== "Right")) {
                    if (actually_direction === "Up")
                    {
                        direction_rotate_position_body_snake.push("Up-Left");
                    }

                    else
                    {
                        direction_rotate_position_body_snake.push("Down-Left");
                    }

                    actually_direction = direction[2];
                    rotate_position_body_snake_x.push(pos_snake_head_x);
                    rotate_position_body_snake_y.push(pos_snake_head_y);
                    actually_status_head_snake_x = head_snake_x[1];
                    actually_status_head_snake_y = head_snake_y[0];
                    set_direction = false;
                }
                break;

            case 39:
                if ((actually_direction !== "Right") && (actually_direction !== "Left")) {
                    if (actually_direction === "Up")
                    {
                        direction_rotate_position_body_snake.push("Up-Right");
                    }

                    else
                    {
                        direction_rotate_position_body_snake.push("Down-Right");
                    }

                    actually_direction = direction [3];
                    rotate_position_body_snake_x.push(pos_snake_head_x);
                    rotate_position_body_snake_y.push(pos_snake_head_y);
                    actually_status_head_snake_x = head_snake_x[1];
                    actually_status_head_snake_y = head_snake_y[1];
                    set_direction = false;
                }
                break;
            case 13:
            {
                if(game_over === true)
                {
                    press_exit = true;
                }
                break;
            }
        }
    }
}

function init()
{
    for(var i = 0; i < 500; i += 20)
    {
        position_map_x.push(i);
        position_map_y.push(i);
    }
}

function Random_Like()
{
    var accepted_value = false;
    var again_random_position_x = [];
    var again_random_position_y = [];

    for(var i = 0; i < 25; i++)
    {
          again_random_position_x.push(false);
          again_random_position_y.push(false);
    }

    while(!accepted_value)
    {
        x = Math.round(Math.random() * 24);
        y = Math.round(Math.random() * 24);

        if((position_map_x[x] === pos_snake_head_x) && (position_map_y[y] === pos_snake_head_y)) {}

        else
        {
            if((position_map_x[x] === pos_snake_tail_x) && (position_map_y[y] === pos_snake_tail_y)) {}

            else
            {
                for(var i = 0; i < pos_snake_body_x.length; i++)
                {
                    if((position_map_x[x] === pos_snake_body_x[i]) && (position_map_y[y] === pos_snake_body_y[i]))
                    {
                        accepted_value = false;
                        break;
                    }

                    else
                    {
                        accepted_value = true;
                    }
                }
            }
        }
    }

    x = position_map_x[x];
    y = position_map_y[y];
    random_a_new_like = false;
}

function Colision_With_Like()
{
    var add_body_snake = false;

    if((pos_snake_head_x === x)&&(pos_snake_head_y === y))
    {
        random_a_new_like = true;
        add_body_snake = true;
        points += 10;
        document.getElementById("Points").innerText = "Points : " + points;
    }

    if(add_body_snake === true)
    {
        if(actually_direction_body_snake[actually_direction_body_snake.length - 1] === "Up")
        {
            pos_snake_body_x.push(pos_snake_body_x[pos_snake_body_x.length - 1]);
            pos_snake_body_y.push(pos_snake_body_y[pos_snake_body_y.length - 1] + 20);
        }

        else if (actually_direction_body_snake[actually_direction_body_snake.length - 1] === "Down")
        {
            pos_snake_body_x.push(pos_snake_body_x[pos_snake_body_x.length - 1]);
            pos_snake_body_y.push(pos_snake_body_y[pos_snake_body_y.length - 1] - 20);
        }

        else if (actually_direction_body_snake[actually_direction_body_snake.length - 1] === "Left")
        {
            pos_snake_body_x.push(pos_snake_body_x[pos_snake_body_x.length - 1] + 20);
            pos_snake_body_y.push(pos_snake_body_y[pos_snake_body_y.length - 1]);
        }

        else
        {
            pos_snake_body_x.push(pos_snake_body_x[pos_snake_body_x.length - 1] - 20);
            pos_snake_body_y.push(pos_snake_body_y[pos_snake_body_y.length - 1]);
        }

        actually_status_body_snake_x.push(actually_status_body_snake_x[actually_status_body_snake_x.length - 1]);

        actually_direction_body_snake.push(actually_direction_body_snake[actually_direction_body_snake.length - 1])
    }
}

function Colision_With_body_tail()
{
    for(var i = 0; i < pos_snake_body_x.length; i++)
    {
        if((pos_snake_head_x === pos_snake_body_x[i])&&(pos_snake_head_y === pos_snake_body_y[i]))
        {
            game_over = true;
        }
    }

    if((pos_snake_head_x === pos_snake_tail_x)&&(pos_snake_head_y === pos_snake_tail_y))
    {
        game_over = true;
    }
}

function Create_Table_Points_Timer()
{
    document.getElementById("Table-Timer").style.backgroundColor ="black";
    document.getElementById("Table-Timer").style.height = "100px";
    document.getElementById("Timer").innerText = "Timer : " + timer;
    document.getElementById("Table-Timer").style.opacity="1";
    document.getElementById("Table-Player").style.backgroundColor ="black";
    document.getElementById("Table-Player").style.height = "200px";
    document.getElementById("Points").innerText = "Points : " + points;
    document.getElementById("Table-Player").style.opacity="1";
}

function Delete_Table_Points()
{
    document.getElementById("Table-Player").style.opacity="0";
    document.getElementById("Table-Timer").style.opacity="0";

}

function Menu_Game()
{
        if (game_start === true)
        {
            Create_Table_Points_Timer();
            accepted_click = false;
            refresh_game= setInterval(Game, 6000 / 60);
            game_start = false;
            clearInterval(refresh_menu);
        }
        else
        {
           content_area.drawImage(image_menu[3],0,0,500,500);
           content_area.drawImage(image_menu[4],move_image_cloud_1,0,100,100);
           content_area.drawImage(image_menu[5],move_image_cloud_2,200,100,100);
           content_area.drawImage(image_menu[6],move_image_cloud_3,350,100,100);

           if(((pos_cursor_x>=175)&&(pos_cursor_x<=285)) && ((pos_cursor_y>=130)&&(pos_cursor_y<=190)))
           {
               hover_position = 1;
           }

           else if(((pos_cursor_x>=95)&&(pos_cursor_x<=360)) && ((pos_cursor_y>=240)&&(pos_cursor_y<=303)))
           {
               hover_position = 2;
           }

           else
           {
               hover_position = 0;
           }
           if(main_menu === true)
           {

               content_area.drawImage(image_menu[hover_position],0,0,500,500);
           }

           else
           {

               if(((pos_cursor_x>=30)&&(pos_cursor_x<=165)) && ((pos_cursor_y>=417)&&(pos_cursor_y<=479)))
               {
                   hover_position = 8;
               }
               else
               {
                   hover_position = 7;
               }

               content_area.drawImage(image_menu[hover_position],0,0,500,500);
           }

            move_image_cloud_1--;
            move_image_cloud_2--;
            move_image_cloud_3--;

            if(move_image_cloud_1 ===-90)
            {
                move_image_cloud_1 = 500;
            }

            if(move_image_cloud_2 === -110)
            {
                move_image_cloud_2 = 500;
            }

            if(move_image_cloud_3 === -90)
            {
                move_image_cloud_3=500;
            }

            topCanvas = canvas.offsetTop;
            leftCanvas = canvas.offsetLeft;
        }

        topCanvas = canvas.offsetTop;
        leftCanvas = canvas.offsetLeft;
}

function Round(n, k)
{
    var factor = Math.pow(10, k);
    return Math.round(n*factor)/factor;
}

function Game()
{
    if(begin_game === true)
    {
        if(timer_start === 20)
        {
            time_to_start = '2';
        }

        else if(timer_start === 10)
        {
            time_to_start = '1';
        }

        if(timer_start === 0)
        {
            begin_game = false;
        }
        timer_start--;
        content_area.fillStyle = "black";
        content_area.fillRect(0,0,506,506)
        content_area.font = "60px Comic Sans MS";
        content_area.fillStyle = "white";
        content_area.textAlign = "center";
        content_area.fillText(time_to_start, canvas.width/2, canvas.height/2);
    }
    else if(game_over === true)
    {
        Game_Over();
    }
    else
    {
        Board();
        Draw_Snake();
        Colision_With_Like();
        if (random_a_new_like === true)
        {
            Random_Like();
        }
        set_direction = true;
        Move();
        Colision_With_body_tail();
        document.getElementById("Timer").innerText = "Timer : " + Round(timer, 2);
        timer -= 0.1;
        if(timer <= 0)
        {
            game_over = true;
        }
    }
}

function Game_Over()
{
    content_area.fillStyle = "black";
    content_area.fillRect(0,0,506,506)
    content_area.font = "60px Comic Sans MS";
    content_area.fillStyle = "white";
    content_area.textAlign = "center";
    content_area.fillText("GAME OVER", canvas.width/2, canvas.height/2 - 50);
    content_area.fillText("Press Enter", canvas.width/2, canvas.height/2 + 50);

    if(press_exit === true)
    {
        Restart();
        accepted_click = true;
        Delete_Table_Points();
        press_exit = false;
        game_over = false;
        clearInterval(refresh_game);
        refresh_menu = setInterval(Menu_Game,1000/60);
    }
}

function playerposition(e)
{
    pos_cursor_x = e.clientX-leftCanvas;
    pos_cursor_y = e.clientY-topCanvas;
}

function cursor_click_on_position()
{
    if(accepted_click === true)
    {
        if(((pos_cursor_x>=175)&&(pos_cursor_x<=285)) && ((pos_cursor_y>=130)&&(pos_cursor_y<=190)))
        {
            game_start = true;
        }

        else if(((pos_cursor_x>=95)&&(pos_cursor_x<=360)) && ((pos_cursor_y>=240)&&(pos_cursor_y<=303)))
        {
            main_menu = false;
        }

        else if(((pos_cursor_x>=30)&&(pos_cursor_x<=165)) && ((pos_cursor_y>=417)&&(pos_cursor_y<=479)))
        {
            main_menu = true;
        }
    }
}

canvas.addEventListener("mousemove",playerposition);
document.addEventListener("keydown", Change_Position);
canvas.addEventListener('click', cursor_click_on_position);
init();
refresh_menu = setInterval(Menu_Game,1000/60);


