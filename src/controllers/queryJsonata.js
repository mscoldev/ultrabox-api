var jsonata = require("jsonata");

var data = {
    example: [
        { value: 4 },
        { value: 7 },
        { value: 13 }
    ]
};
var expression = jsonata("$sum(example.value)");
var result = expression.evaluate(data);
console.log(result);  // returns 24