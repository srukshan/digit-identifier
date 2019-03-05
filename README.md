# digit-identifier
Train an neural network to identify digits written on a canvas

## Introduction

In this project I focused on helping others understand how AIs work by allowing visitors to train an fully untrained neural Network.

## How it works

This is a Neural Network build using TensorFlow JS Library.


| Layer (type)            | Output shape      | Param # |
|-------------------------|-------------------|---------|
| input1 (InputLayer)     | [ null,28,28,1 ]  | 0       |
| conv2d_Conv2D1 (Conv2D) | [ null,27,27,64 ] | 320     |
| re_lu_ReLU1 (ReLU)      | [null,27,27,64]   | 0       |
| max_pooling2d_MaxPooling2D1| [null,13,13,64]| 0       |
| conv2d_Conv2D2 (Conv2D) | [null,12,12,64]   | 16448   |
| re_lu_ReLU2 (ReLU)      | [null,12,12,64]   | 0       |
| max_pooling2d_MaxPooling2D2| [null,6,6,64]  | 0       |
| flatten_Flatten1 (Flatten) | [null,2304]    | 0       |
| dense_Dense1 (Dense)    | [null,300]        | 691500  |
| dense_Dense2 (Dense)    | [null,100]        | 30100   |
| dense_Dense3 (Dense)    | [null,10]         | 1010    |
_________________________________________________________
Total params: 739378

Trainable params: 739378

Non-trainable params: 0