<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Digifier - Online Digit Identifier</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="styles/main.css" />
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.15.3/dist/tf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/nicolaspanel/numjs@0.15.1/dist/numjs.min.js"></script>
</head>
<body>
        <div class="bars">
            <div id="1" class="bar"></div>
            <div id="2" class="bar"></div>
            <div id="3" class="bar"></div>
            <div id="4" class="bar"></div>
            <div id="5" class="bar"></div>
            <div id="6" class="bar"></div>
            <div id="7" class="bar"></div>
            <div id="8" class="bar"></div>
            <div id="9" class="bar"></div>
            <div id="0" class="bar"></div>
        </div>
    <div class="btn">
        <button onclick="train(1)">1</button><button onclick="train(2)">2</button><button onclick="train(3)">3</button><button onclick="train(4)">4</button><button onclick="train(5)">5</button><button onclick="train(6)">6</button><button onclick="train(7)">7</button><button onclick="train(8)">8</button><button onclick="train(9)">9</button><button onclick="train(0)">0</button>
        <br/><button onclick="trainBatch()">Train</button>
    </div>
    <script src="scripts/main.js"></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-132070160-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-132070160-1');
    </script>
</body>
</html>
