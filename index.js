const downloadCall = require("./download");
const imageToPdf = require("./pdf");

var printLoctions = ['MAL', 'KOZ', 'KAN', 'KOC', 'PAL', 'THM', 'THR']

function main() {
    downloadCall().then((imagePath) => {
        var i = 0
        function abc() {

            console.log(imagePath);
            setTimeout(() => {
                i++
                imageToPdf(imagePath).then(() => {
                    console.log('created');
                }).catch(() => {
                    if (i < 5) {
                        console.log(i);
                        abc()
                    } else {
                        main()
                    }
                })
            }, 10000);
        }
        abc()
    })
}

main()