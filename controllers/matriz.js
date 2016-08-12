function Matriz(firstParameter, columnas, elementos) {
	

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
		var _self = this;
		if (this.validarMatriz()) {
			this.filas = this.elementos.length;
			this.columnas = this.elementos[0].length;
			this.elementos.forEach(function(fila, indexF) {
				fila.forEach(function(elemento, index) {
					if (typeof(elemento) === "string") {
						if (elemento.indexOf('/') !== -1) {
							_self.elementos[indexF][index] = new fraccion(elemento.split("/")[0], elemento.split("/")[1]); 
						}
					} else {
						_self.elementos[indexF][index] = new fraccion(elemento); 
					}
				});
			});
		} else {
			this.elementos = undefined;
			throw "NO SE PUDIERON AGREGAR LOS ELEMENTOS. MATRIZ INVALIDA"
		}
	}

	this.validarMatriz = function() {

		if (this.elementos === undefined) {
			return false;
		}

		var tempColumnas = columnas;
		if (this.columnas === undefined) {
			if (this.elementos[0] === undefined) {
				this.elementos[0] = [];
			}
			tempColumnas = this.elementos[0].length;
		}


		if (this.filas !== undefined && this.filas !== this.length) {
			return false;
		}

		for (var i = 0; i < this.elementos.length; i++) {
			if (this.elementos[i].length !== tempColumnas) {
				return false;
			}
		}
		return true;
	}

	this.cambiarReglon = function(R1, R2) {
		this.elementos[R1] = JSON.parse(JSON.stringify(this.elementos[R2]));
		this.elementos[R2] = JSON.parse(JSON.stringify(this.elementos[R1]));
	}

	this.volverUno = function(reglon) {
		var _self = this;
		var changes = {};
		if (this.elementos[reglon][reglon].equals(1)) {
			return;
		}
		if (this.elementos[reglon][reglon].equals(-1)) {
			changes[reglon] = "R" + (reglon + 1) + "-> -R" + (reglon + 1)
			this.elementos[reglon][reglon] = PRODUCTO(this.elementos[reglon][reglon], -1);
			return changes;
		}
		var primeraEntrada = new fraccion(this.elementos[reglon][reglon]);
		changes[reglon] = "R" + (reglon + 1) + "-> R" + (reglon + 1) + " / " + primeraEntrada.toString();
		this.elementos[reglon].forEach(function(elemento, index) {
			elemento.dividir(primeraEntrada);
			_self.elementos[reglon][index] = new fraccion(elemento.numerador, elemento.denominador);
		});
		return changes;
	}
	this.resolverSistema = function() {
		var _self = this;
		//RECORRER EN BUSCA DE UN UNO EN LA PRIMERA POSICION
		// _self.elementos.forEach(function(reglon, index) {
		// 	if (reglon[0] === 1) {
		// 		_self.cambiarReglon(index, 0);
		// 		return false;
		// 	}
		// });
		_self.elementos.forEach(function(reglon, index) {

			// console.log(_self.toString());
			var changes = _self.volverUno(index);
			console.log(_self.toString(changes));
			var changes2 = _self.columnaACero(index);
			console.log(_self.toString(changes2));
		});
		console.log(_self.toString());


	}

	this.columnaACero = function(reglon) {
		var changes = {};
		for (var i = 0; i < this.elementos.length; i++) {
			if (i === reglon) {
				continue;
			}
			var primeraEntrada = new fraccion(this.elementos[i][reglon].numerador, this.elementos[i][reglon].denominador);
			var operacion = primeraEntrada.esNegativa() ? "sumar" : "restar" ;
			changes[i] = "R" + (i + 1) + "-> R" + (i + 1) + " - " + primeraEntrada.toString() + " * R" + (reglon + 1);
			for (var j = 0; j < this.elementos[reglon].length; j++) {
				if (primeraEntrada.esNegativa() && this.elementos[i][j].esNegativa()) {
					this.elementos[i][j].multiplicar(-1);
				}
				this.elementos[i][j][operacion](PRODUCTO(primeraEntrada, this.elementos[reglon][j]));
			}
		}
		return changes;
	}

	var filas, elementos;
	if (Array.isArray(firstParameter)) {
		this.filas = undefined;
		this.columnas = undefined;
		console.log(JSON.parse(JSON.stringify(firstParameter)));

		this.elementos = JSON.parse(JSON.stringify(firstParameter));
		console.log(elementos)
		this.setElementos();
	} else {
		this.filas = firstParameter;
		if (elementos !== undefined) {
			this.setElementos(firstParameter);
		} else {
			this.elementos = [[]];
		}
	}
	this.toString = function(changes) {
		var string = "";
		this.elementos.forEach(function(fila) {
			string += "[";
			fila.forEach(function(elemento) {
				string += elemento.toString() + ","
			})
			string += "]\n";
		});
		this.toHMTL(changes);
		return string;
	}

	this.toHMTL = function(changes) {

		var doomElement = $("<div class='matriz'><div>");
		var table = $("<table></table>")
		this.elementos.forEach(function(fila, index) {
			// string += "[";
			var row = $("<tr></tr>")
			if (changes) {
				row.append("<td class='change'>" + (changes[index] || ' ') + "</td>");
			}
			fila.forEach(function(elemento) {
				row.append("<td class='elemento'>" + elemento.toString() + "</td>");
			})
			table.append(row);
		});
		doomElement.append(table);
		$(".container").append(doomElement)
	}
}