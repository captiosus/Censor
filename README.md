# Censor

#### Important Fix!
When downloading and installing this application, go into node_modules/node-tesseract/lib/tesseract.js
On line 85, where it says html|hocr|txt, add |box directly after. This allows our program to retrieve coordinates of words and without this it will crash!
