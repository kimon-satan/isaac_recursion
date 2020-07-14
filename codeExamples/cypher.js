var alpha  = "abcdefghijklmnopqrstuvwxyz ";
var cypher = [];

for(var i = 0; i < alpha.length; i++)
{
  cypher.push(alpha[i]);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

shuffle(cypher);
console.log(cypher);

var s = "hello simon";
var cypher_string = "";

for(var i = 0; i < s.length; i++)
{
  cypher_string += cypher.indexOf(s[i]) + ", ";
}

console.log(cypher_string);
