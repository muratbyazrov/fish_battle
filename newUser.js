const newUserBox = document.querySelector('.newUser-box');

function newStart(){
    if(event.keyCode==65){     
        newInterval(oX1New, event.keyCode);
        newUserBox.classList.remove('mirror');
    } else if (event.keyCode==68) {
        newInterval(oX2New, event.keyCode);
        newUserBox.classList.add('mirror');
    } else if (event.keyCode==87) {
        newInterval(oY1New, event.keyCode);
    } else if (event.keyCode==83) {
        newInterval(oY2New, event.keyCode);
    }
}

//координаты игрока 2
let xNewUser = gameWindow.offsetWidth/2;
let yNewUser = gameWindow.offsetHeight/2;

//функции, задающие направление
function oX1New(){ 
    xNewUser = xNewUser - 1;
    newUserBox.style.left = `${xNewUser}px`;
    if (xNewUser < 0-newUserBox.offsetWidth){xNewUser = gameWindow.offsetWidth + newUserBox.offsetWidth}
}

function oX2New(){
    xNewUser = xNewUser + 1;
    newUserBox.style.left = `${xNewUser}px`;
    if (xNewUser > gameWindow.offsetWidth){xNewUser = 0-newUserBox.offsetWidth} 
}

function oY1New(){
    yNewUser = yNewUser - 1;
    newUserBox.style.top = `${yNewUser}px`;
    if(yNewUser < 0 - newUserBox.offsetHeight){yNewUser = gameWindow.offsetHeight}
}

function oY2New(){
    yNewUser = yNewUser + 1;
    newUserBox.style.top = `${yNewUser}px`;
    if(yNewUser > gameWindow.offsetHeight){yNewUser = 0 - newUserBox.offsetHeight}
}



let newKeys = [];
let newint1;
let newint2;
let newSpeed = 5;

//функция уменьшения скорости
function newSlower(){   
    newSpeed = newSpeed+0.05;
}

function newInterval(func, key){;
    newKeys.push(arguments[1]);
    if (newKeys.length = 1) {
        clearInterval(newint2);
        newint1 = setInterval(func, newSpeed)
    } 
    if(newKeys.length = 2 && newKeys[0]!=newKeys[1] ) {
        clearInterval(newint1);
        newint2 = setInterval(func, newSpeed)
        newKeys.length = 0;
    }  
}

//Обработчик нажатия на клавиши
document.addEventListener('keydown', newStart);

//Пафосное название автопилот
function autoPilot(){
    let newUserX = parseInt(newUserBox.style.left);
    let newUserY = parseInt(newUserBox.style.top);
    newSpeed = 7; //Немного уменьшаем скорость компа, иначе он непобедим 

    if( Math.round(newUserX/20)*20 != Math.round((randomLeft-newUserBox.offsetWidth/2)/20)*20 ){

        if(Math.round(newUserX/20)*20 < Math.round((randomLeft-newUserBox.offsetWidth/2)/20)*20){
            let evt = new KeyboardEvent('keydown', {'keyCode':68});
            document.dispatchEvent(evt);
        } else {
            let evt = new KeyboardEvent('keydown', {'keyCode':65});
            document.dispatchEvent(evt);
        }

    } else if(Math.round(newUserY/20)*20 != Math.round(randomTop/20)*20){

        if(Math.round(newUserY/20)*20 > Math.round(randomTop/20)*20) {
            //виртуальный клик наверх
            let evt = new KeyboardEvent('keydown', {'keyCode':87});
            document.dispatchEvent(evt);
        } else {
            //виртуальный клик вниз
            let evt = new KeyboardEvent('keydown', {'keyCode':83});
            document.dispatchEvent(evt);
        }
    }    
}
 



