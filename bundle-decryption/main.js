import {A} from './a'
import B from './b'
import(/*webpackChunkName:"dynamic1"*/ './c').then(data=>console.log(data))
import(/*webpackChunkName:"dynamic2"*/ './d').then(data=>console.log(data))
console.log(A)
B()

