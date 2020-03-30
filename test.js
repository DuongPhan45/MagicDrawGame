var GAME_SPEED = 300;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const DROP_SPEED = 10;
const VERTICAL_STROKE_IMAGE = "Vertical Stroke.png";
const HORIZONTAL_STROKE_IMAGE = "Horizontal Stroke.png";
const TRIANGLE_IMAGE = "Triangle.png";
const RECTANGLE_IMAGE = "Rectangle.png";
const CIRCLE_IMAGE = "Circle.png";
let score = 0;
var x = document.getElementById("music"); 

var x_location = [31, 141, 251, 361, 471, 581, 691, 801]
var shape = [CIRCLE_IMAGE, RECTANGLE_IMAGE, VERTICAL_STROKE_IMAGE, TRIANGLE_IMAGE, HORIZONTAL_STROKE_IMAGE]

let EnemyList = [
    { shape: CIRCLE_IMAGE, x: 31, y: -100},
    { shape: HORIZONTAL_STROKE_IMAGE, x: 581, y: -100 },
    { shape: HORIZONTAL_STROKE_IMAGE, x: 801, y: -100 },
   
]



// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
const drawCanvas = document.getElementById("drawCanvas");
// Return a two dimensional drawing context
const ctx1 = gameCanvas.getContext("2d");
const ctx2 = drawCanvas.getContext("2d");

function clearCanvas1() {
    //  Select the colour to fill the drawing
    ctx1.fillStyle = CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    ctx1.strokestyle = CANVAS_BORDER_COLOUR;
    // Draw a "filled" rectangle to cover the entire canvas
    ctx1.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    ctx1.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
// clearCanvas1();

function clearCanvas2() {
    //  Select the colour to fill the drawing
    ctx2.fillStyle = CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    ctx2.strokestyle = CANVAS_BORDER_COLOUR;
    // Draw a "filled" rectangle to cover the entire canvas
    ctx2.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    // Draw a "border" around the entire canvas
    ctx2.strokeRect(0, 0, drawCanvas.width, drawCanvas.height);
}

setTimeout(function onTick() {
    clearCanvas1();
    clearCanvas2();
}, GAME_SPEED)

function main() {
    // If the game ended return early to stop game
    if (reachBottom()) return;
    setTimeout(function onTick() {
        clearCanvas1();
        clearCanvas2();
        advanceEnemy();
        if (score <= 100 ) GAME_SPEED = 300;
        else if (100< score <=300 ) GAME_SPEED =250;
        else if (300< score <= 600 ) GAME_SPEED =150;
        else if (score < 600) GAME_SPEED = 100;
        else if (score <1000) GAME_SPEED = 50;
        else{
            GAME_SPEED = 30;
        }
        
        // Call game again
        main();
    }, GAME_SPEED)
}

function runMain() {
    x.play();
    restartButton = document.getElementsByClassName("restartButton")[0].innerHTML;
   if ( restartButton == "START"){
        document.getElementById("restart").textContent = "RESTART";
        main();
   }
   else {
    location.reload(); 
   }
}

function manageMusic(){
    musicButton = document.getElementsByClassName("musicButton")[0].innerHTML
    if ( musicButton == "MUTE"){
        document.getElementById("music_choice").textContent = "PLAY";
        x.play();
   }
   else if (musicButton == "PLAY") {
        x.pause();
        document.getElementById("music_choice").textContent = "MUTE";
   }
}

// Start game
// main();

// Return true if any of the enemies reach the bottom line
function reachBottom() {
    for (var i = 0; i < EnemyList.length ;i ++) {
        if (EnemyList[i].y + 100 > gameCanvas.height) {
            return true
        }
    }

}

function Create_Enemy() {
   
    // Randomize the x-cordinate of the enemy
    var random_x = Math.floor(Math.random() * 8);
    // Randomize the shape of the enemy
    var random_shape = Math.floor(Math.random() * 5);
    var _enemy = {
        shape: shape[random_shape],
        x: x_location[random_x],
        y: 0,
    }
    // Push new enemies to the EnemyList randomly
    var random_result = Math.random()
    if (score <= 100){
        if (random_result < 0.1) {
            EnemyList.push(_enemy)
    }
    }
    else if (score < 200){
        if (random_result < 0.3) {
            EnemyList.push(_enemy)
    }
    }
    else {
        if (random_result < 0.5) {
            EnemyList.push(_enemy)
    }
    }
}



function loadImages(sources, callback) {
    var images = [];
    var loadedImages = 0;
    var numImages = sources.length;
    // get num of sources

    for (var src = 0; src < numImages; src++) {
        images[src] = new Image();
        images[src].onload = function () {
            
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src].shape;
    }
    // Advances the enemy by adding to the y-cordinate of the enemy
    EnemyList.forEach(e => {
                    e.y += DROP_SPEED;
                }
                )

}

function advanceEnemy() {
    Create_Enemy();
    loadImages(EnemyList, function (images) {

        for (var i = 0; i < EnemyList.length; i++) {
            ctx1.drawImage(images[i], EnemyList[i].x, EnemyList[i].y, 100, 100);
        }
    });
    

}


// ********************************************************************************
// ******************************* THE DRAWING CANVAS******************************
// ********************************************************************************



$(document).ready(function () {
    const STROKE_POINT = 2;
    const RECTANGLE_POINT = 5;
    const TRIANGLE_POINT = 4;
    const CIRCLE_MINIMIZED_POINT = 5;
    
    
    // The user's score
  

    canvasDrawShape = document.getElementById('drawCanvas')


    // $('#help').css('left', (window.innerWidth - $('#help').width()) / 2 + 'px')
    //     .css('top', (window.innerHeight - $('#help').height()) / 2 + 'px')


    if (window.location.search == '?embed') {
        $('#moreinfo').hide()
        $('#larger').show()
    
    }

    c = canvasDrawShape.getContext('2d')

    function getpos(e) {
        var offset = $(canvasDrawShape).offset()
        return {
            x: e.pageX - offset.left,
            y: e.pageY - offset.top,
        }
    }

    TAN_HALF_PI = Math.tan(Math.PI / 2)

    function direction(d) {
        var horiz = (Math.abs(d.x) > Math.abs(d.y))
        if (horiz) {
            if (d.x < 0) return 0;
            return 1;
        } else {
            if (d.y < 0) return 2;
            return 3;
        }
    }

    colors = ['rgba(255,0,0,0.5)',
        'rgba(0,255,0,0.5)',
        'rgba(0,0,255,0.5)',
        'rgba(200,200,0,0.5)',
    ]


    function clearCanvas2() {
        //  Select the colour to fill the drawing
        ctx2.fillStyle = CANVAS_BACKGROUND_COLOUR;
        //  Select the colour for the border of the canvas
        ctx2.strokestyle = CANVAS_BORDER_COLOUR;
        // Draw a "filled" rectangle to cover the entire canvas
        ctx2.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
        // Draw a "border" around the entire canvas
        ctx2.strokeRect(0, 0, drawCanvas.width, drawCanvas.height);
        }

    function vector(x, y) {
        return {
            x: x,
            y: y,
        }
    }

    function delta(a, b) {
        return vector(a.x - b.x, a.y - b.y)
    }

    function angle(d) {
        return Math.atan((1.0 * d.y) / d.x)
    }

    function angle_between(a, b) {
        return Math.acos((a.x * b.x + a.y * b.y) / (len(a) * len(b)))
    }

    function len(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y)
    }

    function unit(c) {
        var l = len(c)
        return vector(c.x / len(c), c.y / len(c))
    }

    function scale(c, f) {
        return vector(c.x * f, c.y * f)
    }

    function add(a, b) {
        return vector(a.x + b.x, a.y + b.y)
    }

    function rotate(v, a) {
        return vector(v.x * Math.cos(a) - v.y * Math.sin(a),
            v.x * Math.sin(a) + v.y * Math.cos(a))
    }

    function average(l) {
        var x = 0
        var y = 0
        for (var i = 0; i < l.length; i++) { x += l[i].x; y += l[i].y }
        return vector(x / l.length, y / l.length)
    }

    $(canvasDrawShape).mousedown(function (e) {
        $("#help").fadeOut(200)
        prev = getpos(e)
        line = [prev]


        $(canvasDrawShape).mousemove(function (e) {
            pos = getpos(e)

            c.beginPath();
            c.moveTo(prev.x, prev.y);
            c.lineTo(pos.x, pos.y);
            c.stroke()

            prev = pos
            line.push(pos)

        })

        c.strokeStyle = "rgba(0,0,0,0.2)"


        $(canvasDrawShape).mouseup(function () {
            $(canvasDrawShape).unbind('mousemove').unbind('mouseup')
            corners = [line[0]]
            var n = 0
            var t = 0
            var lastCorner = line[0]
            for (var i = 1; i < line.length - 2; i++) {

                var pt = line[i + 1]
                var d = delta(lastCorner, line[i - 1])

                if (len(d) > 20 && n > 2) {
                    ac = delta(line[i - 1], pt)
                    if (Math.abs(angle_between(ac, d)) > Math.PI / 4) {
                        pt.index = i
                        corners.push(pt)
                        lastCorner = pt
                        n = 0
                        t = 0
                    }
                }
                n++
            }

            if (len(delta(line[line.length - 1], line[0])) < 25) {
                corners.push(line[0])

                c.fillStyle = 'rgba(0, 0, 255, 0.3)'

                if (corners.length == 5) {
                    //check for square
                    var p1 = corners[0]
                    var p2 = corners[1]
                    var p3 = corners[2]
                    var p4 = corners[3]
                    var p1p2 = delta(p1, p2)
                    var p2p3 = delta(p2, p3)
                    var p3p4 = delta(p3, p4)
                    var p4p1 = delta(p4, p1)
                    if ((Math.abs(angle_between(p1p2, p2p3) - Math.PI / 2)) < Math.PI / 6
                        && (Math.abs(angle_between(p2p3, p3p4) - Math.PI / 2)) < Math.PI / 6
                        && (Math.abs(angle_between(p3p4, p4p1) - Math.PI / 2)) < Math.PI / 6
                        && (Math.abs(angle_between(p4p1, p1p2) - Math.PI / 2)) < Math.PI / 6) {
                        c.fillStyle = 'rgba(0, 255, 255, 0.3)'
                        var p1p3 = delta(p1, p3)
                        var p2p4 = delta(p2, p4)

                        var diag = (len(p1p3) + len(p2p4)) / 4.0

                        var tocenter1 = scale(unit(p1p3), -diag)
                        var tocenter2 = scale(unit(p2p4), -diag)

                        var center = average([p1, p2, p3, p4])

                        var angle = angle_between(p1p3, p2p4)

                        corners = [add(center, tocenter1),
                        add(center, tocenter2),
                        add(center, scale(tocenter1, -1)),
                        add(center, scale(tocenter2, -1)),
                        add(center, tocenter1)]
                    }
                }




                c.beginPath()
                c.moveTo(corners[0].x, corners[0].y)
                for (var i = 1; i < corners.length; i++) {
                    c.lineTo(corners[i].x, corners[i].y)
                }
                c.fill()
            } else {
                corners.push(line[line.length - 1])
            }

            c.strokeStyle = 'rgba(0, 0, 255, 0.5)'
            c.beginPath()
            c.moveTo(corners[0].x, corners[0].y)
            for (var i = 1; i < corners.length; i++) {
                c.lineTo(corners[i].x, corners[i].y)
            }
            c.stroke()


            c.fillStyle = 'rgba(255, 0, 0, 0.5)'
            for (var i = 0; i < corners.length; i++) {
                c.beginPath()
                c.arc(corners[i].x, corners[i].y, 4, 0, 2 * Math.PI, false)
                c.fill()
            }
            console.log(corners)
            
            // Detect shapes and kill enemies
            function killEnemy(){
                // Strokes result in 2 points
                if (corners.length == STROKE_POINT){
                    // Vertical strokes have x-coordinate difference smaller than y-coordinate difference
                    if( Math.abs(corners[corners.length-1].x - corners[0].x) < Math.abs(corners[corners.length-1].y - corners[0].y) ) {
                        deleteElement(VERTICAL_STROKE_IMAGE);
                    }
                    // Horizontal strokes have x-coordinate difference greater than y-coordinate difference
                    else if( Math.abs(corners[corners.length-1].x - corners[0].x) > Math.abs(corners[corners.length-1].y - corners[0].y) ) {
                        deleteElement(HORIZONTAL_STROKE_IMAGE);
                    }
                }
                // Triangles result in 3 points
                else if (corners.length == TRIANGLE_POINT) deleteElement(TRIANGLE_IMAGE);
                else if (corners.length == RECTANGLE_POINT) deleteElement(RECTANGLE_IMAGE);
                else if (corners.length > CIRCLE_MINIMIZED_POINT)  deleteElement(CIRCLE_IMAGE);
            }

            // Delete elements with shape silimar to detected drawn shape in array
            function deleteElement(enemy){
                for( var i = 0; i < EnemyList.length; i++) {
                    if (EnemyList[i].shape == enemy ) {
                        EnemyList.splice(i,1);
                        i--;
                        //Increase score by 10
                        score += 10;
                    }
                }
                // Display score on screen
                document.getElementById('score').innerHTML = score;
            }
            killEnemy();
            setTimeout(function () {
                c.clearRect(0, 0, canvasDrawShape.width, canvasDrawShape.height);
                clearCanvas2();
        
            }, 6000);

        })
    })

})
