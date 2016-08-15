
SUMAR = function(n1, n2) {
	if (!isNaN(n1)) {
		n1 = new fraccion(n1,1);
	}
	if (!isNaN(n2)) {
		n2 = new fraccion(n2,1);
	}
	var retVal = new fraccion(n1.numerador, n1.denominador);
	retVal.sumar(n2);
	return retVal;
}

RESTAR = function(n1, n2) {
	if (!isNaN(n1)) {
		n1 = new fraccion(n1,1);
	}
	if (!isNaN(n2)) {
		n2 = new fraccion(n2,1);
	}
	var retVal = new fraccion(-n1.numerador, n1.denominador);
	retVal.sumar(n2);
	return retVal;
}

DIVIDIR = function(n1, n2) {
	if (!isNaN(n1)) {
		n1 = new fraccion(n1,1);
	}
	if (!isNaN(n2)) {
		n2 = new fraccion(n2,1);
	}
	var retVal = new fraccion(n1.numerador, n1.denominador);
	retVal.dividir(n2);
	return retVal;
}
		
PRODUCTO = function(n1, n2) {
	// if (!isNaN(n1)) {
	// console.log(n1.toString() + " * " + n2.toString())
		n1 = new fraccion(n1);
	// }
	// if (!isNaN(n2)) {
		n2 = new fraccion(n2);
	// }
	// var retVal = new fraccion(n1.numerador, n1.denominador);
	// console.log(n1.toString() + " * " + n2.toString())
	n1.multiplicar(n2);			
	return n1;
}



Number.prototype.sumar = function() { 
	var _self = this
	console.log(arguments)
	for (var i = 0; i < arguments.length; i++) {

		if (!isNaN(arguments[i])) {
			_self += arguments[i];
		} else if (arguments[i] instanceof fraccion) {
			if (arguments[i].esEntera()) {
				_self += arguments[i].numerador;
			} else {
				_self = SUMAR(arguments[i], _self);
			}
		}
	}
	return this;
}

$.fn.bindMatriz = function() {
	console.log($(this))
}