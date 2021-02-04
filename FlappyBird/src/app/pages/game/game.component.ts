import { Component, OnInit, ViewChild, ElementRef,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit ,AfterViewInit{

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('myCanvas')
  public myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.game();
  }

  public game() {
    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeNorth = new Image();
    let pipeSouth = new Image();
    let fly = new Audio();
    let scoreSound = new Audio();
    fly.src = "../../assets/fly.mp3";
    scoreSound.src = "../../assets/score.mp3"
    bg.src = "../../assets/background-night.png";
    bird.src = "../../assets/yellowbird-upflap.gif";
    pipeSouth.src = "../../assets/pipe-green-north.png";
    pipeNorth.src = "../../assets/pipe-green-south.png";
    fg.src = "../../assets/base.png";
    let ctx = this.myCanvas.nativeElement.getContext('2d');
    let gap = 85;
    let score = 0;
    let bX = 10;
    let bY = 150;
    let gravity = 10;
    let constant = 320 + gap;

    // pipe coordinates
    let pipe = [];
    let state = "";
    pipe[0] = {
      x: 288,
      y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
    }


    // on key down
    document.addEventListener("mousedown", moveUp);
    function moveUp() {
      bY -= 50;
      fly.play();
    }

    // draw images
    function draw() {
      ctx.drawImage(bg, 0, 0);
      for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x -= 8;
        state = "true";
        if (pipe[i].x == 0) {
          pipe.push({
            x: 288,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
          })
        }

        // detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y
          + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) ||
          bY + bird.height >= 515 - fg.height) {
          state = "false";

          document.addEventListener("mousedown", startover);
          function startover() {
            location.reload();// reload the page
          }
        }
        if (pipe[i].x == 0 && state == "true") {
          score++;
          scoreSound.play();
        } else {
          score = score;
        }
      }
      ctx.drawImage(bird, bX, bY);
      ctx.drawImage(fg, 0, 515 - fg.height);
      bY += gravity;
      ctx.fillStyle = '#000';
      ctx.font = "20px Verdana";
      ctx.fillText("Score:" + score, 10, 550 - 50);
    }

    function drawGameover() {
      let gameover = new Image();
      gameover.src = "../../assets/gameover.png";
      ctx.drawImage(gameover, 50, 200);
    }
    function loop() {
      if (state == "false") {
        drawGameover();
        setTimeout(loop, 1000);
      } else {
        draw();
        setTimeout(loop, 60);
      }
    }

    loop();

  }
}
