async function testAsync(){
  return 'hello async';
}

const result =testAsync();
console.log(result);


function* gen(x){
  var y = yield x + 2;
  return y;
}
const g=gen(1);
console.log(g.next());
console.log(g.next());