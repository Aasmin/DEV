# Road Map for VS CODE Editor:
Deadline: 11 Oct 2020 - 4 days
## Observed: Mostly the library integrations(APIs) will be done. (Learning) PS: Thank You stackoverflow.com!
### Use Monaco Editor in the editor area.(can also try codeMirror/Ace editor)
   Reference: https://github.com/microsoft/monaco-editor-samples/blob/master/electron-amd-nodeIntegration/electron-index.html
   Use Jstree for the file structure area. [i.e to show file heirarchy] (Didn't use w2ui as it slows down the opening)

How to integrate Terminal? 
## Overview: xterm(UI) <-> node-pty(pseudo terminal) <-> Terminal
### * Xterm (for UI) - I/P lega
For installing Xterm, Make sure to have: 
Reference: https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md#The-acid-test
#### Required for Xterm and pty
   * node-gyp (npm install -g node-gyp) 
   * python 2.7
   * node 10+
### * node-pty (for shell commands) -shell ko chlae ga. 
   pty - Pseudo terminal. jo node ki baat krwata hai terminal se. As we cant directly use terminal.
* shell OS ko chlae ga
### Note: 
   * ejs is used when kamm ik baar baar krna hunda or easy bnan lai.
   * linear gradients picked up from https://webgradients.com/
   * if node-gyp gives an error:
      1. delete all node modules
      2. npm uninstall node-gyp -g
      3. npm install node-gyp -g
      4. bash npm_install.sh
   * Setting theme in Monaco Editor: https://stackoverflow.com/questions/47393659/monaco-editor-settheme-is-not-a-function
   * Picked up Shadow from: https://getbootstrap.com/docs/4.1/utilities/shadows/ 
   Remove min from link: https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css and searched up the id.