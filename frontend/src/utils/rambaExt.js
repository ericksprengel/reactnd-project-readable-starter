import {
  chain,
  curry,
  map,
  zipObj,
} from 'ramda'

// ref: https://github.com/ramda/ramda/wiki/Cookbook#make-an-object-out-of-a-list-with-keys-derived-form-each-element
const objFromListWith = curry((fn, list) => chain(zipObj, map(fn))(list))

export {
  objFromListWith,
}