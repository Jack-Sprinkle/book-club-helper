import multer from "multer";

const upload = multer({dest: './public/upload'});
const imageMiddleware = (upload.single('image'), function (req, res, next){
    console.log(req.files)
    console.log(req.body)
    return next()
});

export default imageMiddleware;