const gameWindow = document.querySelector('.main-window');
const userBox = document.querySelector('.user-box');
newUserBox = document.querySelector('.newUser-box');
const winWindow = document.querySelector('.win-window');
const winWindowImg = document.querySelector('.win-window__image');
const choiceWin = document.querySelector('.choice-win');
const catchWindow = document.querySelector('.catch');


//Манупулятор для игрока 1
//координаты игрока 1
let xUser = gameWindow.offsetWidth/2;
let yUser = gameWindow.offsetHeight/2;


function start(){
    if(event.keyCode==37){     
        interval(oX1, event.keyCode);
        userBox.classList.remove('mirror');
    } else if (event.keyCode==39) {
        interval(oX2, event.keyCode);
        userBox.classList.add('mirror');
    } else if (event.keyCode==38) {
        interval(oY1, event.keyCode);
    } else if (event.keyCode==40) {
        interval(oY2, event.keyCode);
    }
}

let keys = [];
let int1;
let int2;
let speed = 5;

//функция уменьшения скорости
function slower(){   
    speed = speed+0.05;
}

function interval(func, key){;
    keys.push(arguments[1]);
    if (keys.length = 1) {
        clearInterval(int2);
        int1 = setInterval(func, speed)
    } 
    if(keys.length = 2 && keys[0]!=keys[1] ) {
        clearInterval(int1);
        int2 = setInterval(func, speed)
        keys.length = 0;
    }  
}

//функции, задающие направление
function oX1(){ 
    xUser = xUser - 1;
    userBox.style.left = `${xUser}px`;
    if (xUser < 0-userBox.offsetWidth){xUser = gameWindow.offsetWidth+userBox.offsetWidth}
}

function oX2(){
    xUser = xUser + 1;
    userBox.style.left = `${xUser}px`;
    if (xUser > gameWindow.offsetWidth){xUser = 0-userBox.offsetWidth} 
}

function oY1(){
    yUser = yUser - 1;
    userBox.style.top = `${yUser}px`;
    if(yUser < 0 - userBox.offsetHeight){yUser = gameWindow.offsetHeight}
}

function oY2(){
    yUser = yUser + 1;
    userBox.style.top = `${yUser}px`;
    if(yUser > gameWindow.offsetHeight){yUser = 0 - userBox.offsetHeight}
}

//Обработчик нажатия на клавиши
document.addEventListener('keydown', start);


//функция создания еды для шариков
const food = document.createElement('div')
food.classList.add('food');
//Это координаты еды
let randomLeft;
let randomTop;

function createFood(){ 
    gameWindow.appendChild(food);
    randomTop = Math.random()*(gameWindow.offsetHeight-30)+0
    randomLeft = Math.random()*(gameWindow.offsetWidth-30)+0
    food.style.top = `${randomTop}px`;
    food.style.left = `${randomLeft}px`;
}
createFood();

//Убрать еду
function removeFood(){
    gameWindow.removeChild(food);
}

//Зарядка
function fat(user){
    user.style.width = `${user.offsetWidth+3.5}px`;
    user.style.height = user.style.width;
    user.style.borderRadius = user.style.height
}

//функция рекции поедания еды
function eat(maxWidth, coeff){
    //Координаты юзера1
    let userX = parseInt(userBox.style.left);
    let userY = parseInt(userBox.style.top);

    //Координаты юзера2
    let newUserX = parseInt(newUserBox.style.left);
    let newUserY = parseInt(newUserBox.style.top);
    //проверка юзера 1
    if( randomLeft > userX - food.offsetWidth && randomLeft < userX + userBox.offsetWidth &&
        randomTop > userY - food.offsetHeight && randomTop < userY + userBox.offsetHeight){
        removeFood();
        createFood();
        
        if(userBox.offsetWidth<=maxWidth){
            slower();
            fat(userBox);
        }
    }
    //проверка юзера2
    if( randomLeft > newUserX - food.offsetWidth && randomLeft < newUserX + newUserBox.offsetWidth &&
        randomTop > newUserY - food.offsetHeight && randomTop < newUserY + newUserBox.offsetHeight){
        removeFood();
        createFood();
        
        if(newUserBox.offsetWidth<=maxWidth){
            newSlower();
            fat(newUserBox);
        } 
    }
    //проверка выигрыша
    if( userX > newUserX - userBox.offsetWidth && userX < newUserX + newUserBox.offsetWidth &&
        userY > newUserY - userBox.offsetHeight && userY < newUserY + newUserBox.offsetHeight){
            if(userBox.offsetWidth > (newUserBox.offsetWidth*coeff)){
                stopAllInt();
                winner('./images/рыбка3.png');
            } else if( (userBox.offsetWidth*coeff) < newUserBox.offsetWidth){
                stopAllInt();
                winner('./images/рыбка4.png');
            }
    }
    //проверка ничьи 
    if(newUserBox.offsetWidth >= maxWidth && userBox.offsetWidth >= maxWidth){
        stopAllInt();
        catchWindow.classList.add('catch_active');
    }
}

const eatInt = setInterval(eat, 0, 140, 1.3)

//функция, котороя присваивает атрибут с фото победителя
function winner(src){
    winWindow.classList.add('win-activeWindow');
    winWindowImg.setAttribute('src', `${src}`)
}

//Закрытие всех счетчиков. Game Over!
function stopAllInt(){
    clearInterval(eatInt);
    clearInterval(int1);
    clearInterval(int2);
    clearInterval(newint1);
    clearInterval(newint2);
}



choiceWin.addEventListener('click', choice)

function choice(event){
    if(event.target.id == "two-player"){
        choiceWin.classList.add('choice-win_deactive');
        gameWindow.classList.add('main-window_active');
    } else if (event.target.id == 'one-player') {
        choiceWin.classList.add('choice-win_deactive');
        gameWindow.classList.add('main-window_active');
        setInterval(autoPilot, 100);
    }
}

