const Axios = require('axios')
const Fs = require('fs')
const { getUrl, path } = require("./urls");
const ImagesToPDF = require('images-pdf');

async function downloadCall() {
    return new Promise((resolve, reject) => {
        imageLinks = []
        getUrl().then((imageUrl) => {
            imageUrl.forEach(async (element, index, array) => {
                let link = element.url
                let dirPath = element.path
                let fileName = element.fileName
                console.log(fileName);
                imageLinks.push(dirPath + '/' + fileName)
                if (!Fs.existsSync(dirPath)) {
                    Fs.mkdirSync(dirPath, { recursive: true }, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("New directory successfully created.")
                        }
                    })
                } else {
                    console.log('founded');
                }
                await downloadImage(link, dirPath, fileName).then((url) => {
                    console.log('done');
                }).catch((url) => {
                    console.log("err url is:", url);
                })
            });
            resolve(imageLinks)
        })
    })
}



async function downloadImage(link, dirPath, fileName) {
    const url = link
    const path = dirPath + '/' + fileName
    const writer = Fs.createWriteStream(path)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    }).catch((err) => {
        console.error("err url is:", err.config.url);
        Axios({
            url: err.config.url,
            method: 'GET',
            responseType: 'stream'
        })
    })


    response.data.pipe(writer)


    return new Promise((resolve, reject) => {
        writer.on('finish', resolve(url))
        writer.on('error', reject(url))
    })
}


module.exports = downloadCall