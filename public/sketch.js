let Size = 50;
var block; 
var allText = [];
var textLength;
var qrOutput;

function setup() {
    createCanvas(640,480);
    document.querySelector('canvas').setAttribute('id', 'canvas101')
    block = new Block();
    block.makeTextBlock();

}

function draw() {
    
    background(0);
    //https://www.npmjs.com/package/qrcode#qr-code-options
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark:"#FFFFFF",
          light:"#0000"
        },
        errorCorrectionLevel: 'H'
      }
    
    QRCode.toDataURL('some text', opts, function (error, url) {
        if (error) {
            console.error(error)
        } else { 
            var c = document.getElementById('canvas101');
            var context = c.getContext('2d');
            var newImg = new Image();
            newImg.src = url;
            context.drawImage(newImg, 0, 0);
            
        }
    });

    block.show();

    // console.log(frameCount);

    if(frameCount == 100) {
        block.erase();
        // console.log(block);
        block.makeTextBlock();
    }

}

class Word {
    constructor(_y) {
        this.x = 0;
        this.y = _y;
        this.text;
    }

    getText(_arrayNum) {
        // console.log('in getText: '+ allText[_arrayNum]);
        this.text = allText[_arrayNum].names;
    }

    move() {
        this.x += random(1,10);

        if (this.x > width) {
            this.x = 0;
        }
    }

}

class Block {

    constructor() {
        this.words = [];
    }

    makeTextBlock() {
        
        var text_loc = Size;
        this.number = textLength;

        pullDatabase();
        
        for (var i = 0; i<this.number; i++) {
            var word = new Word(text_loc);
            word.getText(i);
            this.words.push(word);
            text_loc += Size;
        }
    }

    show() {

        this.words.forEach(word => {
            text(word.text, word.x, word.y);
            textSize(Size);
            fill(255);
            word.move();
        });

    }

    erase() {

        for(var i = this.words.length; i>-1; i--) {
            // console.log('The length is: ' + this.words.length + " && the arrays are " + this.words);
            this.words.pop(this.words[i]);
            
        }
    }

}

async function pullDatabase() {

    var data_json = await fetch('/pulldb');
    var data = await data_json.json();
    

    for (i=0; i<data.db_length; i++){
        // console.log(data.word[i]);
        allText[i] = data.word[i];
        // console.log('all text vales are ' + allText[i].names);
    };

    textLength = data.db_length;
    // console.log('textLength is: ' + textLength);
}