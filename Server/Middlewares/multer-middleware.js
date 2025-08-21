// multer-middleware.js
const multer = require('multer');
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("imgUrl"); // Changed to "imgUrl"
module.exports = { singleUpload };
// multer-middleware.js
// const multer = require('multer');
// const storage = multer.memoryStorage();

// // Must match client's field name ('imgUrl')
// module.exports = {
//   singleUpload: multer({ storage }).single('imgUrl') 
// };



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
// const singleUpload = multer({ 
//     storage, 
// })

// module.exports = {singleUpload}

 