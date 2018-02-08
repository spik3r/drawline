freehand = 'freehand.js';
menu = 'menu.html';

if (document.getElementById('can') && document.getElementById('draggable')) {
    $("#draggable").toggle();
} else {
    var erase_drawing = false;
    var stop = false;
    var canvas = document.createElement("canvas");
    canvas.id = "can";
    document.body.appendChild(canvas);
    var draggable = document.createElement("div");
    draggable.id = "draggable";
    document.body.appendChild(draggable);
    $("#drawingCanvas").append('</canvas>');

    $("#draggable").append('<div class="title_content_draggable"  style="color: black; font-size: 16px;">drawlines</div><br><input type="button" value="New Straight Line" id="new_line" class="draggable_button" style="color: black;"><br><input type="button" value="Dotted Horizontal Line" id="new_horizontal_line" class="draggable_button" style="color: black;"><input type="button" value="freehand" id="free_hand" class="draggable_button" style="color: black;"><input type="button" value="Close" id="exit_canvas" class="draggable_button" style="color: black;"><br><br><input type="button" value="red" id="red_color" class="draggable_button" style="background-color:red; color: black; padding: 5px; font-size: 12px;"><input type="button" value="black" id="black_color" class="draggable_button" style="background-color:black; color:white; padding: 5px; font-size: 12px;"><input type="button" value="blue" id="blue_color" class="draggable_button" style="background-color:blue; color:white; padding: 5px; font-size: 12px;"><input type="button" value="yellow" id="yellow_color" class="draggable_button" style="background-color:yellow; color:black; padding: 5px; font-size: 12px;">');
    

    $("#new_line").click(newLine);
    $("#new_horizontal_line").click(newHorizontalLine);
    $("#free_hand").click(drawFreeHand);
    $("#exit_canvas").click(exit);
    
    // color stuff
    var line_color = "yellow";
    $("#red_color").click(function() {
        updateColor('red');
    });

    $("#black_color").click(function() {
        updateColor('black');
    });

    $("#yellow_color").click(function() {
        updateColor('yellow');
    });

    $("#blue_color").click(function() {
        updateColor('blue');
    });

    var content = document.getElementsByClassName("title_content_draggable");
    var buttons = document.getElementsByClassName("draggable_button");
    
    
    with(draggable.style) {
        boxSizing = 'content-box';
        lineHeight = '0.7';
        cursor = 'move';
        height = '80px';
        width = '160px';
        textAlign: 'left';
        borderColor = 'rgb(236, 236, 236)';
        backgroundColor = 'rgb(236, 236, 236)';
        boxShadow = '10px 10px 50px #5e5e5e';
        borderStyle = 'solid';
        borderWidth = '5px';
        borderRadius = '5px';
        margin = '20px';
        padding = '6px';
        position = 'absolute';
        top = '0';
        right = '0';
        zIndex = '2147483647';
        userSelect = 'none';
        display = 'block';
    }
    with(canvas.style) {
        cursor = 'crosshair'
        top = '0px';
        left = '0px';
        position = 'absolute';
        zIndex = '2147483646';
        backgroundColor = 'transparent';
        userSelect = 'none';
    }

    $(function() {
        $("#draggable").draggable();
    });
    var needFirstPoint = true;
    var drawingHorizontal = false;

    function newHorizontalLine() {
        drawingHorizontal = true;
    }

    function newLine() {
      needFirstPoint = true;
      drawingHorizontal = false;
  }

    function exit() {
        document.getElementById('can').remove();
        document.getElementById('draggable').remove();
    }

    function updateColor(color) {
        console.log('update color: ' + color);
        line_color = color;
    }

function drawNextLine(ctx, x, y) {
ctx.strokeStyle = line_color;
ctx.setLineDash([]);
  if (needFirstPoint) {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    needFirstPoint = false;
  } else {
    ctx.color
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function drawHorizontalLine(ctx, y) {
    console.log("drawHorizontalLine");
    ctx.strokeStyle = line_color;
    needFirstPoint = true;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 10]);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    }


var canvas = document.getElementById('can');
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

console.log(canvas);
  $('#can').on('click', function(e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;

        if (drawingHorizontal) {
            drawHorizontalLine(ctx, y)
        } else {
            drawNextLine(ctx, x, y);
        }

  });

    function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

     function updateOldXY(x, y){
            oldX = x;
            oldY = y;
      }

      function resetOldXY(){
        oldX = null;
        oldY = null;
      }

    var oldX;
    var oldY;
    function drawTouch(ctx, x, y) {
        console.log("drawTouch: ", x, y);
        ctx.setLineDash([]);
        if (oldX === null || oldY === null){
            updateOldXY(x, y);
        }

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = line_color;
          ctx.moveTo(oldX, oldY);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
          updateOldXY(x, y);
    }

    var shouldDraw = false;
    function updateShouldDraw(event) {
        console.log(event.type);
        if (event.type === 'mousedown') {
            shouldDraw = true;
        }
        else if (event.type === 'mouseup') {
            shouldDraw = false;
            resetOldXY();
        }
    };

  function drawFreeHand() {
    var context = canvas.getContext('2d');
          canvas.addEventListener('mousemove', function(evt) {
        if (shouldDraw){
            drawingHorizontal = false;
            needFirstPoint = true;

            var mousePos = getMousePos(canvas, evt);
            var x = mousePos.x;
            var y = mousePos.y;
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            console.log(context);
            
            console.log(x);
            console.log(y);
            drawTouch(context, x, y);

        // writeMessage(canvas, message);
        }
      }, false);

    canvas.addEventListener("mousedown", function(e) {
        updateShouldDraw(e)
    }, false);

    canvas.addEventListener("mouseup", function(e) {
        updateShouldDraw(e)
    }, false);
  }
}