// Chapter 5 Quiz Ninja Example

const quiz = [
    { name: "Superman", realName: "Clark Kent" },
    { name: "Wonder Woman", realName: "Diana Prince" },
    { name: "Batman", realName: "Bruce Wayne" },
];
  
const game = {
    start(quiz){
        this.questions = [...quiz];
        this.score = 0;
        for(const question of this.questions){
        this.question = question;
        this.ask();
        }
        this.gameOver();
    },
    ask(){
        const question = `What is ${this.question.name}'s real name?`;
        const response =  prompt(question);
        this.check(response);
    },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
        alert('That is Correct! Well done');
        this.score++;
        } else {
        alert(`Incorrect, the correct answer was ${answer}`);
        }
    },
    gameOver(){
        alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }
}

// Chapter 6 and 7 Quiz Ninja Example
const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    start: document.getElementById('start'),
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    }
};

const game2 = {
    start(quiz){
        this.questions = [...quiz];
        this.score = 0;
        for(const question of this.questions){
        this.question = question;
        this.ask();
        view.hide(view.start);
        }
        this.gameOver();
    },
    ask(){
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question,question);
        const response =  prompt(question);
        this.check(response);
    },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
        view.render(view.result,'That is Correct! Well done',{'class':'correct'});
        alert('That is Correct! Well done');
        this.score++;
        view.render(view.score,this.score);
        } else {
        view.render(view.result,`Incorrect, The correct answer was ${answer}`,{'class':'incorrect'});
        alert(`Incorrect, The correct answer was ${answer}`);
        }
    },
    gameOver(){
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.show(view.start);
    }

}
view.start.addEventListener('click', () => game2.start(quiz), false);


//Chapter 7 examples
const clickParagraph = document.getElementById('click');
clickParagraph.addEventListener('click',() => console.log('click') );
clickParagraph.addEventListener('mousedown',() => console.log('down') );
clickParagraph.addEventListener('mouseup',() => console.log('up') );

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('click', highlight);
function highlight(event){
    event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () =>  console.log('You Moved!') );

addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}`));
addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));

addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));
addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
            console.log('Action canceled!');
        }
    });
addEventListener('click', (event) => {
    if (event.shiftKey) {
        console.log('A Shifty Click!');
     }
});    

const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);
function remove(event) {
    console.log('Enjoy this while it lasts!');
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click',remove);
}

const brokenLink = document.getElementById('broken');
brokenLink.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),true);
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);

ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'),false );
liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),false );

const delExe = document.getElementById('list1');
delExe.addEventListener('click',highlight);

