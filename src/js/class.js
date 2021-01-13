const Animal = function (type, name, color,) {
    this.type = type;
    this.name = name;
    this.color = color;
    
}
Animal.showAnimal = function (animal) {
    console.log(animal);
}
Animal.prototype.goWalk = function (name) {
    console.log(`${this.name} go to walk!`)
} ;
Animal.prototype.changeColor = function (color) {
    this.color = color;
}
Animal.prototype.changeName = function (name) {
    this.name = name;
}

const cat = new Animal('cat', 'lusy', 'black')


Animal.showAnimal(cat)

class Hero {
    static showHero(hero) {
        console.log(hero);
    }
    constructor(name, age) {
        this._name = name;
        this.age = age;
    }
    get name () {
        return this._name
    }
    set name(name) {
      return  this._name = name;
}
    moreAge(quantity) {
        this.age += quantity;
    }
};

const gerry = new Hero('Gerry', 25);
// console.log(gerry);

// gerry.changeName('Piter')

// console.log(gerry);
// gerry.moreAge(15);
// console.log(gerry);
Hero.showHero(gerry)
gerry.name = 'Patric';
console.log(gerry.name);
