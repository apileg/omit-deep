# del function

The `del` function is a recursive utility function used in the `omitDeep` function to remove specified keys from an object, while preserving the object's structure.

# Parameters

-   `oldObject`: The object from which keys need to be removed.
-   `excludedKeys`: An array of keys to be excluded from the object.

# Return Value

The function returns a new object with the specified keys removed.

# Algorithm

<ol>
  <li>If <code>oldObject</code> is an instance of <code>Map</code>, create a new empty <code>Map</code> called <code>newMap</code>.</li>
  <li>Iterate over each key-value pair in <code>oldObject</code> using the <code>forEach</code> method.</li>
  <li>If the current key is not included in <code>excludedKeys</code>, recursively call <code>del</code> with the value as the <code>oldObject</code> and <code>excludedKeys</code> as arguments, and assign the result to <code>newMap[key]</code>.</li>
  <li>Return <code>newMap</code>.</li>
  <li>If <code>oldObject</code> is an instance of <code>Set</code>, create a new empty <code>Set</code> called <code>newSet</code>.</li>
  <li>Iterate over each value in <code>oldObject</code> using the <code>forEach</code> method.</li>
  <li>If the current value is not included in <code>excludedKeys</code>, recursively call <code>del</code> with the value as the <code>oldObject</code> and <code>excludedKeys</code> as arguments, and add the result to <code>newSet</code>.</li>
  <li>Return <code>newSet</code>.</li>
  <li>If <code>oldObject</code> is an array, use the <code>map</code> method to iterate over each item in the array and recursively call <code>del</code> with the item as the <code>oldObject</code> and <code>excludedKeys</code> as arguments.</li>
  <li>Return the resulting array.</li>
  <li>If <code>oldObject</code> is an object and not <code>null</code>, create a new empty object called <code>newObject</code>.</li>
  <li>Iterate over each key in <code>oldObject</code> using a <code>for...in</code> loop.</li>
  <li>If the current key is not included in <code>excludedKeys</code>, recursively call <code>del</code> with the value corresponding to the key as the <code>oldObject</code> and <code>excludedKeys</code> as arguments, and assign the result to <code>newObject[key]</code>.</li>
  <li>Return <code>newObject</code>.</li>
  <li>If none of the above conditions are met, return <code>oldObject</code> as it is.</li>
</ol>

# omitDeep function

The `omitDeep` function is the main function that utilizes the `del` function to remove specified keys from an object and its nested properties.

# Parameters

`oldObject`: The object from which keys need to be removed.
`excludedKeys`: An array of keys to be excluded from the object.

# Return Value

The function returns a new object with the specified keys removed, preserving the object's structure and nested properties.

# Algorithm

Call the `del` function with `oldObject` and `excludedKeys` as arguments and return the result.
logStack function
The logStack function is a utility function used to log the stack trace of function calls in a hierarchical format.

# Parameters

`fn`: The function to be wrapped for stack tracing.

# Return Value

The function returns a wrapper function that logs the stack trace before and after the wrapped function call.

# Algorithm

<ol>
  <li>Initialize a variable <code>no</code> to keep track of the current level in the call stack.</li>
  <li>Create an empty <code>Map</code> called <code>noToCount</code> to keep track of the count of function calls at each level.</li>
  <li>Define an anonymous function that serves as the wrapper function.</li>
  <li>Within the wrapper function:
    <ul>
      <li>Get the current count for the current level from <code>noToCount</code>, defaulting to 0 if no count exists.</li>
      <li>Log the level number and count with the message "LVL: {no}.{count} GOT --->" using <code>console.log</code>.</li>
      <li>Log the function arguments using <code>console.dir</code>.</li>
      <li>Call the <code>delimit</code> function to print a delimiter for clarity.</li>
      <li>Increment the count for the current level in <code>noToCount</code> by 1.</li>
      <li>Increment the <code>no</code> variable to move to the next level.</li>
      <li>Call the wrapped function <code>fn</code> with the provided arguments and assign the result to variable <code>r</code>.</li>
      <li>Decrement the <code>no</code> variable to return to the previous level.</li>
      <li>Log the level number and count with the message "LVL: {no}.{count} RETURN <---" using <code>console.log</code>.</li>
      <li>Log the return value <code>r</code> using <code>console.dir</code>.</li>
      <li>Call the <code>delimit</code> function again to print a delimiter.</li>
      <li>Return the result <code>r</code>.</li>
    </ul>
  </li>
  <li>Return the wrapper function.</li>
</ol>

# Example Usage

```js
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

// Wrap the `del` function with `logStack` for stack tracing
del = logStack(del)

// Remove the "age" key from the object and its nested properties
const result = omitDeep(obj, ["age"])

console.dir(result, { depth: null })
```

### The output will display the modified object with the specified keys removed, and the stack trace log showing the function calls and their arguments.
