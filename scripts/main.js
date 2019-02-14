//@ts-check

var canvas = document.createElement("canvas");

canvas.width = 100;
canvas.height = 100;
canvas.style = "border:5px solid gray"
var drawable = canvas.getContext("2d");
drawable.fillStyle = "#fff"
drawable.fillRect(0,0,100,100);
document.body.appendChild(canvas);

var textArea = document.createElement("h1");
textArea.style = "text-align:center;"
document.body.appendChild(textArea);

var loss = document.createElement("h1");
loss.style = "text-align:center;"
document.body.appendChild(loss);

var bars = [];

var X = [];
var Y = [];

var count = 0;

bars.push(document.getElementById("0"));
bars.push(document.getElementById("1"));
bars.push(document.getElementById("2"));
bars.push(document.getElementById("3"));
bars.push(document.getElementById("4"));
bars.push(document.getElementById("5"));
bars.push(document.getElementById("6"));
bars.push(document.getElementById("7"));
bars.push(document.getElementById("8"));
bars.push(document.getElementById("9"));

var output;

var clicked = false;
canvas.addEventListener('mousedown',function(){
    clicked=true;
},false);
canvas.addEventListener('mouseup',function(){
    clicked=false;
},false);

var inputs = [];
canvas.addEventListener('mouseleave',function(){
    var data = drawable.getImageData(0,0,100,100).data;
    
    inputs = [];

    for(var i = 0, n = data.length; i < n; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];

        var gray = (red + green + blue) / 3;
        inputs.push(gray);
    }

    output = getPrediction();
    textArea.innerHTML = output.toString();
    drawable.fillStyle = "#fff"
    drawable.fillRect(0,0,100,100);
    clicked=false;
},false);
canvas.addEventListener('mousemove', function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    if(clicked){
        drawable.fillStyle = "#000"
        drawable.arc(x,y,5,0,2*Math.PI);
        drawable.closePath();
        drawable.fill(); 
        drawable.beginPath();
    }
},false);

var model = tf.sequential();

let in_nodes = canvas.width*canvas.height;


model.add(tf.layers.dense({
    units: 500,
    inputShape: [in_nodes],
    activation: 'sigmoid',
    useBias: true
}));

model.add(tf.layers.dense({
    units: 100,
    activation: 'relu',
    useBias: true
}));

model.add(tf.layers.dense({
    units: 10,
    activation: 'softmax',
    useBias: true
}));

model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError'
});

function shapeBar(bar, height){
    height=height*100;
    bar.style='height:'+height+'px; margin-top:'+(100-height)+'px;';
}

function getPrediction(){
    const myin = tf.tensor([inputs]);

    const myout = model.predict(myin).dataSync();
    var max = 0;
    var maxVal = 0;
    for(var i = 0; i < 10; i++){
        shapeBar(bars[i], myout[i]);
        if(max<myout[i]){
            max = myout[i];
            maxVal = i;
        }
    }
    tf.dispose(myin);
    return maxVal;
}

function train(dout){
    const thisout = parseInt(dout, 10);

    var mout = [];

    for(var i = 0; i < 10; i++){
        if(thisout==i){
            mout.push(1);
        }else{
            mout.push(0);
        }
    }

    X.push(inputs);
    Y.push(mout);
}

function trainBatch(){
    const myin = tf.tensor(X);
    const myout = tf.tensor(Y);

    model.fit(myin, myout, { 
        epochs: 500
    }).then(history => {
        console.log(history.history.loss[0]);
    });
}