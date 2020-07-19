import Card from './card'
import * as fruits from './fruits'

export default class m3m0 {
  static sizeOfCard = 140;
  static gapBetwenCards = 10;
  static amountOfCards = 10;
  static flipDelay = 1000;

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx =  this.canvas.getContext("2d");
    this.cards  = [];
    this.flippedCards = [];
    this.clickedTile = 0;
  }

  initGame(){
    this.addCards();
    this.addResetBtn();
    document.addEventListener("click", (event) =>  this.clickHandler(event));
    this.draw();
  }

  addCards(){
    let shuffledSrcs = fruits.getShuffledArray();
    let size = m3m0.sizeOfCard + m3m0.gapBetwenCards;
    for (let i = 0; i < 5; i++) {
      for(let j = 0; j < 2; j++) {
        this.cards.push(new Card(i * size, j * size, shuffledSrcs.pop()));
      }
    }
  }

  clickHandler(event){
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.clickedTile <= 1 && this.cards[i].is_selected(mouseX, mouseY) && this.cards[i].choosen !== true) {
        this.cards[i].choosen = true;
        this.flippedCards.push(i);
        this.clickedTile++;
      }
    }
  }

  addResetBtn(){
    this.btn = document.createElement('button');
    this.btn.addEventListener('click',this.reset.bind(this));
    this.btn.setAttribute('id','reset');
    this.btn.innerText = 'Reset';
    document.body.appendChild(this.btn);
  }

  draw(){
    //draws frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].flipped === false) {
        this.cards[i].drawFace(this.ctx);
      } else {
        this.cards[i].drawPic(this.ctx);
      }
    }
    this.check();
    this.requestId = requestAnimationFrame(this.draw.bind(this));
  }

  check() {
    //checks if the chosen cards match
    if (this.flippedCards.length === 2) {
      let first = this.flippedCards[0];
      let second = this.flippedCards[1];
  
      if (this.cards[first].src === this.cards[second].src) {
        this.flippedCards = [];
        this.clickedTile = 0;
      } else {
        setTimeout(()=>{
          this.cards[first].flipped = false;
          this.cards[second].flipped = false;
          this.cards[first].choosen = false;
          this.cards[second].choosen = false;
          this.clickedTile = 0;
        }, m3m0.flipDelay);
      }
      this.flippedCards = [];
    }

    //checks if all cards are flipped
    let amountOfFlippedCards = 0;
    this.cards.forEach((card)=>{
      amountOfFlippedCards += Number(card.flipped);
    });
    if(amountOfFlippedCards === m3m0.amountOfCards) {
      if(this.timer) return;
      this.timer = setTimeout(()=>{
        this.reset();
        this.timer = null;
      }, m3m0.flipDelay);
    }
  }
  
  reset() {
    // set new cards
    this.cards  = [];
    this.flippedCards = [];
    this.clickedTile = 0;
    this.addCards()
  }

}

new m3m0().initGame();