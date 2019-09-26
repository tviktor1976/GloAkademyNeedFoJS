const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea= document.querySelector('.gameArea'),
  car = document.createElement('div'),
  music = document.createElement('audio');

  car.classList.add('car');

start.addEventListener('click',startGame);
document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);

const keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting ={
    start: false,
    score: 0,
    speed: 10,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement +1; 
 }

function startGame(){
    start.style.display = 'none';
    gameArea.innerHTML = '';
    
    for (let i=0; i < 50; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }

    for (let i=0; i < getQuantityElements(100*setting.traffic); i++){
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * (4-1) + 1);
        enemy.classList.add('enemy');
        enemy.y = -100*setting.traffic*(i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50))  + 'px';
        enemy.style.top = enemy.y + 'px';
        console.log(enemyImg);
        enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
        console.log(enemy.style.background);
        gameArea.appendChild(enemy);

    }

    setting.scope = 0;
    setting.start = true;
    gameArea.appendChild(car);
    music.setAttribute('autoplay', true);
    music.setAttribute('src', './mp3/noize_mc.mp3');
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);   
}

function playGame(){
   
    if (setting.start){
        setting.score += setting.speed;
        score.innerHTML = 'Score<br>' + setting.score; 
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0){
            setting.x-=setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - 50)){
            setting.x+=setting.speed;
        }
        if (keys.ArrowDown && (gameArea.offsetHeight - car.offsetHeight)){
            setting.y+=setting.speed;
        }
        if (keys.ArrowUp && setting.y >0){
            setting.y-=setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
    
}






function startRun(event){
 event.preventDefault();   
 if (keys.hasOwnProperty(event.key)){
    keys[event.key] = true;
 }
}

function stopRun(event){
    event.preventDefault();
    if (keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
     } 
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + "px";
        if (line.y > document.documentElement.clientHeight){
            line.y = -100;
        } 
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right>=enemyRect.left &&
            carRect.left<= enemyRect.right &&
            carRect.bottom >= enemyRect.top ){
            setting.start = false;
            console.warn('LNG');
            start.style.display = '';
            start.style.top = score.offsetHeight;
        }
        item.y +=setting.speed / 2;
        item.style.top = item.y + 'px';
    
        if (item.y >= document.documentElement.clientHeight){
            item.y = -100*setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50))  + 'px';
        }
    });

}