console.log('I am a module and i just loaded into memory and have been executed');

// lo que meta en module.exports será lo que devuelva require
// module.exports = {
//     addition: (a, b) => {
//         return a + b;
//     }
// };
module.exports.suma = (a, b) => {
    return a + b;
};

module.exports.resta = (a, b) => {
    return a - b;
};