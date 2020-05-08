const { readFileSync } = require('fs')
module.exports = {
    files: './bundle.min.js',
    from: 'require("./styles.scss")',
    to: `"${readFileSync('./styles.css').toString().replace(/\n/g, '')}"`,
    verbose: false,
    quiet: true
};