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

## Setup
Before running make sure to run these commands to download necessary libraries
```
npm install
sudo apt-get install tesseract-ocr
sudo apt-get install graphicmagick
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

#### Important Fix!
When downloading and installing this application, go into node_modules/node-tesseract/lib/tesseract.js
On line 85, where it says html|hocr|txt, add |box directly after. This allows our program to retrieve coordinates of words and without this it will crash!
