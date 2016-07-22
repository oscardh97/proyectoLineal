function Matriz(firstParameter, columnas, elementos) {
	var filas, elementos;
	if (Array.isArray(firstParameter)) {
		filas = undefined;
		columnas = undefined;
		this.setElementos(firstParameter);
	} else {
		filas = firstParameter;
		if (elementos !== undefined) {
			this.setElementos(firstParameter);
		} else {
			elementos = [[]];
		}
	}

	this.obtenerTamanio = function() {
		return {
			filas: filas,
			columnas: columnas
		};
	}

	this.obtenerFilas = function() {
		return JSON.parse(JSON.stringify(elementos));
	}
	this.obtenerFilas = function() {
		return filas;
	}

	this.obtenerFilas = function() {
		return columnas;
	}

	this.agregarFila = function(nuevaFila) {
		if (nuevaFila.length === columnas && this.validarMatriz()) {
			elementos.push(nuevaFila);
			return true;
		} else {
			throw "LA FILA NO TIENE EL TAMAÑO CORRECTO";
			return false;
		}
	}

	this.agregarColumna = function(nuevaColumna) {
		if (nuevaColumna.length === filas && this.validarMatriz()) {
			for (var i = 0; i < nuevaColumna.length; i++) {
				elementos[i].push(nuevaColumna[i]);
			}
			return true;
		} else {
			throw "LA COLUMNA NO TIENE EL TAMAÑO CORRECTO";
			return false;
		}
	}

	this.setElementos = function() {
		if (this.validarMatriz()) {
			filas = elementos.length;
			columnas = elementos[0].length;
		} else {
			elementos = undefined;
			throw "NO SE PUDIERON AGREGAR LOS ELEMENTOS. MATRIZ INVALIDA"
		}
	}

	this.validarMatriz = function() {

		if (elementos === undefined) {
			return false;
		}

		var tempColumnas = columnas;
		if (columnas === undefined) {
			if (elementos[0] !== undefined) {
				elementos[0] = [];
			}
			tempColumnas = elementos[0].length;
		}


		if (filas !== undefined && filas !== elementos.length) {
			return false;
		}

		for (var i = 0; i < elementos.length; i++) {
			if (elementos[i].length !== tempColumnas) {
				return false;
			}
		}
		return true;
	}
}