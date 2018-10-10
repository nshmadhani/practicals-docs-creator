


const beautifiers = require('./beatutifier')('c/c++');
beautifiers('./test.c')
    .then(console.log)
    .catch(console.log)