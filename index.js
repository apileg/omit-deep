const obj = {
    name: "Bob",
    age: 42,

    contactInfo: {
        email: "foo@gmail.com",
        age: 42,
    },

    pets: [
        { name: "Jack", age: 10 },
        new Map([
            [
                13,
                {
                    name: "Alice",
                    age: 12,
                    pet: { name: "Doggo", age: 42 },
                },
            ],
        ]),
    ],

    fruits: new Set([{ name: "Hannah", age: 30 }]),
}

function del(oldObject, excludedKeys) {
    const newObject = {}

    for (const key in oldObject) {
        if (oldObject[key] instanceof Object && oldObject[key] !== null) {
            if (oldObject[key] instanceof Map && oldObject[key] !== null) {
                oldObject[key].forEach((v, k) => {
                    console.log(k + ":", v)
                    // newObject[k] = del(oldObject[k], excludedKeys)
                })
            }
            newObject[key] = del(oldObject[key], excludedKeys)
        } else if (!excludedKeys.includes(key)) {
            newObject[key] = oldObject[key]
        }
    }
    return newObject
}

function omitDeep(oldObject, excludedKeys) {
    return del(oldObject, excludedKeys)
}

const result = omitDeep(obj, ["age"])

console.log(result)
