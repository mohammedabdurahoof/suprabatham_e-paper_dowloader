const urlExistSync = require("url-exist-sync");
var baisUrl = 'http://www.enewspapr.com/News/SUPERD'
var d = new Date()
var year = d.getFullYear()
var month = pad(d.getMonth() + 1)
var date = pad(d.getUTCDate())
var location = 'MAL'

var pdfName = `${location}_${year + month + date}.pdf`
var path = `./News/SUPERD/${location}/${year}/${month}/${date}`

function pad(n) { return n < 10 ? '0' + n : n } 
function getUrl() {
    return new Promise((resolve, reject) => {
        var imageUrl = []

        for (let i = 1; i < 25; i++) {
            var url = `${baisUrl}/${location}/${year}/${month}/${date}/${year + month + date}_${i}.jpg`
            var path = `./News/SUPERD/${location}/${year}/${month}/${date}`
            var fileName = `${year + month + date}_${i}.jpg`
            var element = {
                url: url,
                location: location,
                path: path,
                fileName: fileName
            }
            let linkChek = urlExistSync(url);
            console.log(linkChek);
            if (linkChek) {
                imageUrl.push(element)
            }
        }
        resolve(imageUrl)
    })
}
module.exports = { getUrl, pdfName, path }