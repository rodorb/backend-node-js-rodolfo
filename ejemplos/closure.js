'use strict';

// una función que retorna otras funciones
function createCar(numWheels) {
    const motorType = 'electric';

    return {
        hasManyWheels: function() {
            console.log(numWheels);
        },
        whichMotorType: () => {
            console.log(motorType);
        }
    }
}


const car = createCar(4);
// car.hasManyWheels();
// car.whichMotorType();

//car no pierde el contexto aunque se le pase como función de callback a setTimeout
setTimeout(car.hasManyWheels, 1000);