#### Rough Idea
* JS: DOM manipulation (Document API) [Practising it: as browser ka code mostly cpp mein likha hota hai. So directly interact nhi kr skte browser ki renedering process se. Therefoe DOM API is used where document is at top of DOM.]
* For Server: Express, Socket.io (for real time communication)
* Draw: Canvas API (as google maps also uses canvas). Reference: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
* File Upload: Browswer API
* Electron -> Deploy webapp / Deploying server?
* EXE Creation?
* Learn Webrtc? EXTRAS

### CanvasRenderingContext2D 
Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
Here, PATH: collections of subpaths
### Some functions:
* beginPath() - start the subpath
* moveTo() - bina draw kre, pencil ko move krta
* lineTo() - draw krke, pencil move kre ga
* closePath()
* stroke() - to make lines visible (Rendering)

### Why I clear and redraw each time for undo/redo/resize?
Canvas is like painting we can store points of drawing and then redraw.

#### Some Learning points:
* Alternate to addEventListner is to use onclick in .html (Ex: color change in pencil).
* To center anything in a box, use below in style-sheets: 
    "display: flex;
    justify-content: center;
    align-items: center;"

#### References:
  *  Canvas :
      * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
      * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  * Document API:  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
  *  Files : 
    * https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images
    * https://stackoverflow.com/questions/12796513/html5-canvas-to-png-file