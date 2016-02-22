# It's Classified

It's Classified is a website dedicated to protecting sensitive information on commonly used documents. Users upload images of their sensitive documents and we locate areas the user would likely want to censor. The user is able to select the areas they actually want to censor and download their new, censored document.

## How to Use
1. Click on start scanning button
2. Drag image or click on specified area
3. Click on the image that appears on the side
4. When the image finishes processing, select the censor boxes that you wish to keep
5. Click on save to download the image

## Tools used
* Nodejs
* Swig
* Tesseract
* Dropzone.js
* Graphics Magick/ Image Magick
* Express

## Setup
Before running make sure to run these commands to download necessary libraries
```
npm install
sudo apt-get install tesseract-ocr
sudo apt-get install graphicsmagick
```
Navigate into node_modules/node-tesseract/lib/tesseract.js and change line 85 to the following
```
glob(output + '.+(html|hocr|txt|box)', function(err, files){
```

Use the following command to run server
```
nodejs app.js
```

## Authors
| Name        |  Role      |
| ------------| -----------|
| Felicity Ng | Front-end  |
| Roy Xu      | Middleware |
| Leon Chou   | Backend    |
