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
    if (oldObject instanceof Map) {
        const newMap = new Map()
        oldObject.forEach((value, key) => {
            if (!excludedKeys.includes(key)) {
                newMap[key] = del(value, excludedKeys)
            }
        })
        return newMap
    }

    if (oldObject instanceof Set) {
        const newSet = new Set()
        oldObject.forEach((value) => {
            if (!excludedKeys.includes(value)) {
                newSet.add(del(value, excludedKeys))
            }
        })
        return newSet
    }

    if (Array.isArray(oldObject)) {
        return oldObject.map((item) => del(item, excludedKeys))
    }

    if (typeof oldObject === "object" && oldObject !== null) {
        const newObject = {}
        for (const key in oldObject) {
            if (!excludedKeys.includes(key)) {
                newObject[key] = del(oldObject[key], excludedKeys)
            }
        }

        return newObject
    }
    return oldObject
}

function omitDeep(oldObject, excludedKeys) {
    return del(oldObject, excludedKeys)
}

function logStack(fn) {
    let no = 0
    const noToCount = new Map()

    return function () {
        const count = noToCount.get(no) ?? 0

        console.log(`LVL: ${no}.${count} GOT --->`)
        console.dir(arguments)
        delimit()

        noToCount.set(no, count + 1)
        ++no

        const r = fn(...arguments)
        --no

        console.log(`LVL: ${no}.${count} RETURN <---`)
        console.dir(r)
        delimit()

        return r
    }

    function delimit() {
        console.log()
        console.log("----------------------------------")
        console.log()
    }
}

del = logStack(del)

const result = omitDeep(obj, ["age"])

console.dir(result, { depth: null })
