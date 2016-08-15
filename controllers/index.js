matrices = {};

$(document).ready(function() {
	// console.log(arguments);
	newMatrix();
	bindEvents();
});

var bindEvents = function() {
	$("#btnAgregarMatriz").bind("click", function()	{
		newMatrix();
	});
	$("#btnOperar").bind("click", function()	{
		proccesString($("#operation").val());
	});
};

var newMatrix = function() {
	var newId = getNextChar();
	console.log(newId)
	matrices[newId] = new Matriz([
		[1,2,3],
	 	[4,5,6],
	 	[7,8,9]
	], newId);
	$("#originales").append(matrices[newId].toHTML());
};

var getNextChar = function() {
	return String.fromCharCode(65 + Object.keys(matrices).length);
};

var proccesString2 = function(string) {
	console.log(string.indexOf("TRANS(") !== -1)
	if (string.indexOf("TRANS(") !== -1) {
		var index = string.indexOf("TRANS(");
		var newId = string.substring(index + 6, index + 7);
		if (matrices.hasOwnProperty(newId)) {
			$("#resultados").append(matrices[newId].transpuesta().toHTML());
		} else {
			throw "NO EXISTE LA MATRIZ";
		}
		return;
	}
	var sumas = string.split("+");
	var resultado;
	for (var i = 0; i < sumas.length; i++) {
		var multiplicaciones = sumas[i].split("*");
		if (resultado === undefined) {
			if (isNaN(multiplicaciones[0])) {
				resultado = new Matriz(matrices[multiplicaciones[0]]);
				continue;
			} else {
				resultado = multiplicaciones[0];
			}
		}
		console.log(multiplicaciones[0])
		console.log(sumas[i])
		for (var j = 1; j < multiplicaciones.length; j++) {
			// console.log(matrices[])
			if (isNaN(multiplicaciones[j])) {
				resultado = MULTIPLICAR_MATRICES(resultado, matrices[multiplicaciones[j]])
			} else {
				resultado *= multiplicaciones[j];
			}
		}
		// if (multiplicaciones.length > 1) {
		// 	continue;
		// }
		if (sumas.length > 1) {
			resultado = SUMAR_MATRICES(resultado, matrices[sumas[i]]);
		}
	}
	$("#resultados").append(resultado.toHTML());
	// var resultado;
	// for (var i = 0; i < sumas.length; i++) {
	//  	var restas = sumas[i].split("-");
	//  	for (var j = 0; j < restas.length; j++) {
	  	
	//  	}
	//  	console.log(restas)
	// }
}

var SUMAR_MATRICES = function(lMatriz, rMatriz) {
	var newId = getNextChar();
	matrices[newId] = new Matriz(lMatriz);
	matrices[newId].setId(newId);
	matrices[newId].sumar(rMatriz);
	$("#resultados").append(matrices[newId].toHTML());
	return matrices[newId];
}
var MULTIPLICAR_MATRICES = function(lMatriz, rMatriz) {
	var newId = getNextChar();
	if (!isNaN(lMatriz)) {
		lMatriz = new fraccion(lMatriz);
		matrices[newId] = new Matriz(rMatriz);
		matrices[newId].multiplicar(lMatriz);
	} else {
		matrices[newId] = new Matriz(lMatriz);
		matrices[newId].multiplicar(rMatriz);
	}
	matrices[newId].setId(newId);
	$("#resultados").append(matrices[newId].toHTML());
	return matrices[newId];
}

var proccesString = function(cadena) {
   	var testArray = cadena.split("+");
	var total = 0;
	// for(String ele : testArray){
	testArray.forEach(function(ele, index) {
		var multiplicaciones = ele.split("*");
	   	if (multiplicaciones.length > 1) {
	   		var totalMulti = matrices[multiplicaciones[0]];
         	multiplicaciones.forEach(function(multiplicacion, indexM) {
         		if (indexM === 0) {
         			return;
         		}
				totalMulti = MULTIPLICAR_MATRICES(totalMulti, matrices[multiplicacion]);
         	});
         	if (total === undefined) {
         		total = totalMulti;
         	} else {
         		total = SUMAR_MATRICES(total, totalMulti);
         	}
	   	} else {
	   		if (index === 0) {
	   			total = matrices[multiplicaciones[0]];
	   			console.log(total.toString())
	   			return;
	   		}
	   	}
		if (testArray.length > 1)
			total = SUMAR_MATRICES(total, matrices[testArray[index]]);
		
	});
	$("#resultados").append(total.toHTML());
	return total;   
}
        