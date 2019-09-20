import { SimpleLocator } from './index'

const WEAPON = "WEAPON"

interface Weapon {

}

class Sword implements Weapon {

}

class Gun implements Weapon {

}

beforeEach(() => {
    SimpleLocator.reset();
});

test("get empty registration", () => {
    expect(SimpleLocator.get(WEAPON)).toBeNull()
})

test("check registration reset", () => {
    SimpleLocator.set(WEAPON, () => {
        return new Gun()
    })
    SimpleLocator.reset();
    expect(SimpleLocator.get(WEAPON)).toBeNull()
})

test("register weapon to be a gun", () => {
    SimpleLocator.set(WEAPON, () => {
        return new Gun()
    })
    expect(SimpleLocator.get(WEAPON)).toBeInstanceOf(Gun)
})

test("register weapon to gun, then change it to sword", () => {
    SimpleLocator.set(WEAPON, () => {
        return new Gun()
    })

    SimpleLocator.set(WEAPON, () => {
        return new Sword()
    })
    expect(SimpleLocator.get(WEAPON)).toBeInstanceOf(Sword)
})

test("register weapon to be a singleton gun", () => {
    SimpleLocator.setSingleton(WEAPON, () => {
        return new Gun()
    })

    const gunOne = SimpleLocator.get(WEAPON)
    const gunTwo = SimpleLocator.get(WEAPON)

    expect(gunOne == gunTwo).toBeTruthy()
    expect(SimpleLocator.get(WEAPON)).toBeInstanceOf(Gun)
})