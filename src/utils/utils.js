function updateVegetablesCollection (veggies, veggie) {
    var istf
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        istf=false
    } else if (veggies.indexOf(veggie) > -1) {
        istf=true
    }
    
    return Promise.resolve(istf)
}
export {updateVegetablesCollection};
