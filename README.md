# SimpleLocator-Node
SimpleLocator is a lightweight and fast [Service Locator](https://en.wikipedia.org/wiki/Service_locator_pattern) library for js that took inspiration from [Splat](https://github.com/reactiveui/splat) for Xamarin.<br>
- No reflection
- No generated code
- No annotation
- Simple to setup, simple to use: just initialize its rules and you are ready to go!
- Ability to add, modify and remove rules at runtime
- Unit test friendly (see below 'Best practices')
- Basic and singleton registration

[![npm version](https://badge.fury.io/js/simple-locator.svg)](https://badge.fury.io/js/simple-locator)

### How to install
```
npm i simple-locator
```

### Basic usage
Your interface
```
interface IWeapon {

}
```
Your concrete class
```
class Sword implements IWeapon {

}
```
Define the rule:
```
SimpleLocator.set("WEAPON", () => {
    return new Sword()
})
```
Retrieve the concrete class
```
concrete = SimpleLocator.get(WEAPON) as IWeapon
```

### Singleton
In the same way, one can register a class to be a singleton:
```
SimpleLocator.setSingleton(WEAPON, () => {
    return new Sword()
})
```
In this way, SimpleLocator will always return the same instance of MySampleConcreteClass

### Multiple Registration
If you register the same class more times, SimpleLocator will consider only the last one
```
SimpleLocator.set(WEAPON, () => {
    return new Gun()
})

SimpleLocator.set(WEAPON, () => {
    return new Sword()
})
expect(SimpleLocator.get(WEAPON)).toBeInstanceOf(Sword)
```

### Best practices
Using SimpleLocator doesn't mean that it's hard to mock your dependencies: to have it working alongside unit tests, consider to write your classes something like this:
```
class MyClass {
    private weapon: Weapon | null;

    constructor(listProvider: Weapon | null = null) {
        this.weapon = listProvider;
        if(this.weapon == null) {
            this.weapon = SimpleLocator.get("WEAPON") as Weapon
        }
    }
}
```
Then, register the rules like this:
```
SimpleLocator.set("WEAPON", () => {
    return new Gun()
})

SimpleLocator.set("MY_CLASS", () => {
    return new MyClass(SimpleLocator.get("WEAPON"))
})
```
In this way, you can create MyClass by calling:
```
myClass = SimpleLocator.get("MY_CLASS")
```
While in the unit tests, you will create it like this:
```
myClass = new MyClass( new MyMockedDependency() )
```

