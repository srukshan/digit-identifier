# digit-identifier
Train an neural network to identify digits written on a canvas

## Introduction

In this project I focused on helping others understand how AIs work by allowing visitors to train an fully untrained neural Network.

## How it works

This is a Neural Network build with a simple Sequential model using TensorFlow JS Library.

* The Canvas Returns a 100 by 100 pixel array as the input(0-255) to the neural Network.
* In the First Hidden Layer I used a sigmoid as the activation function to normalise the input.
* In the next few layers ReLu function has been used
* At the Last Layer I used the soft max function.

The script will then predict the written digit by finding the maximum of the outputs.