const fs=require('fs'),babel=require('@babel/core');
const out=babel.transformSync(fs.readFileSync('app.jsx','utf8'),{presets:['@babel/preset-react'],minified:true}).code;
fs.mkdirSync('www',{recursive:true});
fs.writeFileSync('www/app.js',out);
fs.copyFileSync('node_modules/react/umd/react.production.min.js','www/react.js');
fs.copyFileSync('node_modules/react-dom/umd/react-dom.production.min.js','www/react-dom.js');
const head=fs.readFileSync('head.html','utf8');
fs.writeFileSync('www/index.html',head+'<div id="root"></div>\n<script src="react.js"></script>\n<script src="react-dom.js"></script>\n<script src="app.js"></script>\n</body>\n</html>\n');
console.log('built www/');
