//@ts-check

var canvas = document.createElement("canvas");

canvas.width = 112;
canvas.height = 112;
canvas.style = "border:5px solid gray"
var drawable = canvas.getContext("2d");
drawable.fillStyle = "#fff"
drawable.fillRect(0,0,112,112);
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
    var data = drawable.getImageData(0,0,112,112).data;
    
    inputs = [];

    for(let i = 0, n = data.length; i < n; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];

        let gray = (red + green + blue) / 3;
        inputs.push(gray);
    }

    let inp = tf.tensor(inputs);
    inp = inp.reshape([112,112]);
    inp = inp.bufferSync();

    let ninp = tf.zeros([28,28]);
    ninp = ninp.add(tf.scalar(255));
    ninp = ninp.bufferSync();

    for(let i = 0; i < 28; i++){
        for(let j = 0; j < 28; j++){
            for(let k = 0; k < 4; k++){
                for(let l = 0; l< 4; l++){
                    let m = inp.get((i*4)+k,(j*4)+l)
                    if(ninp.get(i,j) > m){
                        ninp.set(m,i,j);
                    }
                }
            }
            
        }
    }

    ninp = ninp.toTensor();

    ninp = ninp.reshape([28,28,1]);

    inputs = ninp.arraySync();

    // console.log(inputs);

    // let inp = nj.array(inputs);
    // inp = inp.reshape(112,112);

    // console.log(inp);

    // let ninp = nj.zeros([28,28]);
    // ninp.add(255);
    // console.log(ninp);
    // for(let i = 0; i < 28; i++){
    //     for(let j = 0; j < 28; j++){
    //         for(let k = 0; k < 4; k++){
    //             for(let l = 0; l< 4; l++){
    //                 let m = inp.get((i*4)+k,(j*4)+l)
    //                 if(ninp.get(i,j) > m){
    //                     ninp.set(i,j,m);
    //                 }
    //             }
    //         }
            
    //     }
    // }
    // console.log(ninp);
    // ninp = ninp.reshape(28,28,1)
    // inputs = ninp.tolist();
    // console.log(inputs);

    output = getPrediction();
    textArea.innerHTML = output.toString();
    drawable.fillStyle = "#fff";
    drawable.fillRect(0,0,112,112);
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

function DIModel(inputShape = [28,28,1]){
    const X_input = tf.input({shape: inputShape});
    
    const conv0 = tf.layers.conv2d({filters : 64, kernelSize : [2, 2], strides : 1}).apply(X_input);
    const relu0 = tf.layers.reLU().apply(conv0);
    const max0 = tf.layers.maxPooling2d([2, 2]).apply(relu0);

    const conv1 = tf.layers.conv2d({filters : 64, kernelSize : [2, 2], strides : 1}).apply(max0);
    const relu1 = tf.layers.reLU().apply(conv1);
    const max1 = tf.layers.maxPooling2d([2, 2]).apply(relu1);

    const flat2 = tf.layers.flatten().apply(max1);

    const dense3 = tf.layers.dense({units : 300, activation : 'relu'}).apply(flat2);
    const dense4 = tf.layers.dense({units : 100, activation : 'relu'}).apply(dense3);
    const dense5 = tf.layers.dense({units : 10, activation : 'softmax'}).apply(dense4);

    const model = tf.model({inputs:X_input, outputs:dense5});

    model.compile({optimizer:'adam', loss:'categoricalCrossentropy', metrics:['accuracy']});

    return model;
}

//var model = tf.sequential();

// model.add(tf.layers.dense({
//     units: 500,
//     inputShape: [100,100,1],
//     activation: 'relu',
//     useBias: true
// }));

// model.add(tf.layers.dense({
//     units: 100,
//     activation: 'relu',
//     useBias: true
// }));

// model.add(tf.layers.dense({
//     units: 10,
//     activation: 'softmax',
//     useBias: true
// }));

// model.compile({
//     optimizer: tf.train.adam(0.01),
//     loss: 'meanSquaredError'
// });

var model = DIModel();

function shapeBar(bar, height){
    height=height*100;
    bar.style='height:'+height+'px; margin-top:'+(100-height)+'px;';
}

function getPrediction(){
    let myin = tf.tensor([inputs]);
    //const init = tf.scalar(255);
    
    //myin = myin.div(init);

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
    let myin = tf.tensor(X);
    const myout = tf.tensor(Y);
    const init = tf.scalar(255);
    
    myin = myin.div(init);

    console.log('training Begun')
    model.fit(myin, myout, { 
        epochs: 500
    }).then(history => {
        console.log(history.history.loss[0]);
    });
}