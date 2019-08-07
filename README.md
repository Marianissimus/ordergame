# ordergame

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Some notes:

#1 Comparing arrays with: JSON.stringify(arr1) == JSON.stringify(arr2)

There is absolutely no way that an element inside each of the 2 arrays can be changed by the user (either value or type); so, as they can only differ in regards to their order, this solution seems to be the fastest.

Alternative - a simple and good enough for loop:
```
for (let el in this.unsortedList) {
  if (this.unsortedList[el] !== this.randomizedList[el]){
    return false
  }
  return true
}
```

Lodash's 'isEqual' requires several files ('_isEqual', '_baseIsEqual') and does object type check and comparison, etc, too much code for such a simple check, even with tree shaking.
I'll probably test stringify against array.join
