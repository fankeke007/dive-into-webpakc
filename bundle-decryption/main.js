import {A} from './a'
import B from './b'
import(/*webpackChunkName:"dynamic"*/ './c').then(data=>console.log(data))
console.log(A)
B()

