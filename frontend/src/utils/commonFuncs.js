import {
  chain,
  curry,
  map,
  mergeDeepLeft,
  zipObj,
} from 'ramda'

// transform 'list' in obj using 'fn' return as key,
// and merge it with 'originalObj'
//
// example:
//  objMergeFromListWith(
//    prop('id'),
//    [
//      { id: '22', lastName: 'impiglia' },
//      { id: '33', firstName: 'felipe',   lastName: 'zaca' },
//    ],
//    {
//      '11': { id: '11', firstName: 'erick',    lastName: 'sprengel' },
//      '22': { id: '22', firstName: 'carolina', lastName: 'impiglia' },
//    },
//  )
//
//  output:
//   {
//     '11': { id: '11', firstName: 'erick', lastName: 'sprengel' },
//     '22': { id: '22', firstName: 'carolina', lastName: 'impiglia' },
//     '33': { id: '33', firstName: 'felipe', lastName: 'zaca' }
//   }
//
const objMergeFromListWith = curry(
  (fn, list, originalObj) =>
    mergeDeepLeft(
      originalObj,
      chain(zipObj,map(fn))(list)
    )
)

// ref: https://github.com/ramda/ramda/wiki/Cookbook#make-an-object-out-of-a-list-with-keys-derived-form-each-element
const objFromListWith = curry(
  (fn, list) =>
    chain(zipObj,map(fn))(list)
)

export {
  objMergeFromListWith,
  objFromListWith,
}