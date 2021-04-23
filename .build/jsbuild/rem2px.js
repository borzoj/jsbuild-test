/**
 * This is a script to replace all the `rem` to `px`(assuming 1rem=10px)
 * We need the script to avoid being affected by <html>'s font-size, without this,
 * all the applications can't get out from 'font-size: 62.5%' and affects to Buefy applications
 */
let fs = require('fs');

let myArgs = process.argv.slice(2);
let path = myArgs[0];
let doc = fs.readFileSync(path, 'utf8');

let replacedCss = doc.replace(/(:|\s?){1}([0-9-]*\.?[0-9]*)(rem)/g, function (match, delimeterGroup, numberGroup, sizeGroup, offset, string) {
    let pixelSize = Number(numberGroup) * 10

    if (delimeterGroup === ':') {
        return `:${pixelSize}px`
    } else if (delimeterGroup === ' ') {
        return ` ${pixelSize}px`
    }
});

fs.writeFileSync(path, replacedCss);
