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
                10,
                {
                    name: "Alice",
                    age: 10,
                    pet: { name: "Doggo", age: 42 },
                },
            ],
        ]),
    ],

    fruits: new Set([{ name: "Hannah", age: 30 }]),
}

function flatDelete(oldObject, newObject, excludedKey) {
    for (const key in oldObject) {
        if (key === excludedKey) {
            if (typeof oldObject[key] === "object" && oldObject[key] !== null) {
                newObject[key] = {}
                flatDelete(oldObject[key], newObject[key], excludedKey)
            }
        } else {
            newObject[key] = oldObject[key]
        }
    }

    return newObject
}

// Copy all to new obj without 'age' key
// Create new object without 'age' key
function omitDeep(oldObject, excludedKey) {
    // Return object where key !== 'age'
    const newObject = {}

    flatDelete(oldObject, newObject, excludedKey)
    return newObject
}

const result = omitDeep(obj, "age")

console.log(result)
