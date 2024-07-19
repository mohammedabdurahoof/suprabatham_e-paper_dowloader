const imagesToPdf = require("images-to-pdf");
const { pdfName } = require("./urls");

function imageToPdf(fileName) {
    return new Promise((resolve, reject) => {
        imagesToPdf(fileName, './pdf/'+pdfName).then(() => {
            console.log('pdf created');
            resolve()
        }).catch((err) => {
            console.log(err);
            reject()
        })
    })
}



module.exports = imageToPdf

//new ImagesToPDF.ImagesToPDF().convertFolderToPDF(path, './file.pdf')