"use strict";

// Conclusión
(function () {
  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }

    value = +value;
    exp = +exp; // Si el valor no es un número o el exp no es un entero...

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    } // Shift


    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp))); // Shift back

    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  } // Decimal round


  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp);
    };
  } // Decimal floor


  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  } // Decimal ceil


  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})(); // Round


Math.round10(55.55, -1); // 55.6

Math.round10(55.549, -1); // 55.5

Math.round10(55, 1); // 60

Math.round10(54.9, 1); // 50

Math.round10(-55.55, -1); // -55.5

Math.round10(-55.551, -1); // -55.6

Math.round10(-55, 1); // -50

Math.round10(-55.1, 1); // -60

Math.round10(1.005, -2); // 1.01 -- compare this with Math.round(1.005*100)/100 above
// Floor

Math.floor10(55.59, -1); // 55.5

Math.floor10(59, 1); // 50

Math.floor10(-55.51, -1); // -55.6

Math.floor10(-51, 1); // -60
// Ceil

Math.ceil10(55.51, -1); // 55.6

Math.ceil10(51, 1); // 60

Math.ceil10(-55.59, -1); // -55.5

Math.ceil10(-59, 1); // -50
//# sourceMappingURL=round.lib.js.map