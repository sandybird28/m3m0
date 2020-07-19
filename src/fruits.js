import m3m0 from "./index"

const src = {
     grape: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/grapes_1f347.png',
     pineaple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/pineapple_1f34d.png',
     peach: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/peach_1f351.png',
     banana: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/banana_1f34c.png',
     lemon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/lemon_1f34b.png',
     mango: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/mango_1f96d.png',
     redApple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/red-apple_1f34e.png',
     strawberry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/strawberry_1f353.png',
     cherries: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/cherries_1f352.png',
     greenApple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/green-apple_1f34f.png',
     melon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/melon_1f348.png',
     waterMelon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/watermelon_1f349.png',
     pear: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/pear_1f350.png'
};

export function getShuffledArray() {
     let array = [];
     let fruits = Object.values(src);

     for (let i = 0; i < m3m0.amountOfCards/2; i++) {
          let index = Math.floor(Math.random() * fruits.length);
          array.push(fruits.splice(index, 1));
     }
     array = array.concat(array)

     for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
     }
     return array
}