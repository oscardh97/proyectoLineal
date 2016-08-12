
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
	var _self = this;
	valores.forEach(function(valor) {
		if (!isNaN(valor)) {
			_self += valor;
		} else if (valor instanceof fraccion) {
			if (valor.esEntera()) {
				_self += valor.numerador;
			} else {
				SUMAR(valor, _self);
			}
		}
	});
	return this;
}

$.fn.bindMatriz = function() {
	console.log($(this))
}