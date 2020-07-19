import m3m0 from "./index"
const face = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/face-with-stuck-out-tongue-and-winking-eye_1f61c.png';

export default class Card {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.size = m3m0.sizeOfCard;
    this.width = this.size;
    this.choosen = false;
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.startFlip = false;
    this.flipped = false;
    this.slice = this.size / 7;
  }

  drawFace(ctx) {
    let img = new Image();
    img.src = face;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.size);
    ctx.drawImage(img, this.x + 5, this.y + 5, this.width - 10, this.size - 10);
    if (this.startFlip) {
      this.width -= this.slice
    }
    if (this.width <= this.slice) {
     this.startFlip = false;
      this.flipped = true;
    }
  }

  drawPic(ctx) {
    if(this.width<this.size){
      this.width += this.slice
    } else {
      this.width = this.size;
    }
    let img = new Image();
    img.src = this.src;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.drawImage(img, this.x + 5, this.y + 5, this.size - 10, this.size - 10);
  }

  is_selected(x, y) {
    let decision = x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size;
    if (decision) {
      this.startFlip = true;
    }
    return decision
  }
}
