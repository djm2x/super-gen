const fs = require('fs')


function main() {
    const path = `${__dirname}/Migrations`;

    if (fs.existsSync(path)) {
        fs.rmdirSync(path, { recursive: true });
        console.log('remove folder migrations succssfuly')
    }
}

// 
try {
    main();
} catch (e) {
    console.log('>>>>>>>>>>>> remove-script trace begin')
    console.log(e)
    console.log('>>>>>>>>>>>> remove-script trace end')
}