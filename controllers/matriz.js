function Matriz(firstParameter, id) {
	

	this.obtenerTamanio = function() {
		return {
			filas: this.filas,
			columnas: this.columnas
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

	this.eliminarFila = function(index) {
		this.elementos.splice(index, 1);
		this.filas--;
		this.validarIdentidad();
	};
	this.agregarFila = function(nuevaFila, index) {
		console.log(arguments)
		if (nuevaFila.length === this.columnas) {
			this.elementos.splice(index + 1, 0, nuevaFila);
			this.filas++;
			this.validarIdentidad();
			return true;
		} else {
			throw "LA FILA NO TIENE EL TAMAÑO CORRECTO";
			return false;
		}
	}

	this.agregarColumna = function(nuevaColumna, index) {
		if (nuevaColumna.length === this.filas) {
			for (var i = 0; i < nuevaColumna.length; i++) {
				this.elementos[i].splice(index + 1, 0, new fraccion(nuevaColumna[i]));
			}
			this.columnas++;
			this.validarIdentidad();	
			return true;
		} else {
			throw "LA COLUMNA NO TIENE EL TAMAÑO CORRECTO";
			return false;
		}
	}

	this.eliminarColumna = function(index) {
		for (var i = 0; i < this.filas; i++) {
			this.elementos[i].splice(index , 1);
		}
		this.columnas--;
		this.validarIdentidad();
	}
	this.validarIdentidad = function() {
		var _self = this;
		if (this.id.indexOf("INVERSA") !== -1) {
			return;
		}
		_self.esCuadrada = _self.filas === _self.columnas;
		if (_self.esCuadrada) {
			_self.identidad = [];
			_self.elementos.forEach(function(fila, indexF) {
				_self.identidad.push([]);
				fila.forEach(function(elemento, index) {
					console.log(indexF === index ? 1 : 0)
					_self.identidad[indexF][index] = indexF === index ? 1 : 0;
				});
			});
			this.identidad = new Matriz(_self.identidad, "INVERSA(" + this.id + ")");
			// this.identidad.setId();
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
			_self.validarIdentidad();
		} else {
			this.elementos = undefined;
			throw "NO SE PUDIERON AGREGAR LOS ELEMENTOS. MATRIZ INVALIDA"
		}
	}

	this.validarMatriz = function() {

		if (this.elementos === undefined) {
			return false;
		}

		var tempColumnas = this.columnas;
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
		console.log(R1, R2);

		for (var i = 0; i < this.columnas; i++) {
			var temp = new fraccion(this.elementos[R1][i].toString()); 
			console.log( i + " - " +temp.toString() + " - " + this.elementos[R2][i].toString())
			this.elementos[R1][i] = new fraccion(this.elementos[R2][i].toString());
			this.elementos[R2][i] = new fraccion(temp);
			console.log(this.elementos[0][i].toString())
		}
		console.log(this.elementos[0][0].toString())
		// this.actualizar();
		console.log(this.toString());
	}

	this.volverUno = function(reglon) {
		var _self = this;
		var changes = {};
		var invertChanges = {};
		if (this.elementos[reglon][reglon].equals(1)) {
			return;
		}
		if (this.elementos[reglon][reglon].equals(-1)) {
			var idChange = "R" + (reglon + 1) + "-> R" + (reglon + 1) + " / " + primeraEntrada.toString();
			changes[idChange] = new Matriz(this);
			changes[idChange].setId(idChange);
			this.elementos[reglon][reglon] = PRODUCTO(this.elementos[reglon][reglon], -1);
			return changes;
		}
		var primeraEntrada = new fraccion(this.elementos[reglon][reglon]);
		this.elementos[reglon].forEach(function(elemento, index) {
			elemento.dividir(primeraEntrada);
			_self.elementos[reglon][index] = new fraccion(elemento.numerador, elemento.denominador);
		});
		var idChange = "R" + (reglon + 1) + "-> R" + (reglon + 1) + " / " + primeraEntrada.toString();
		changes[idChange] = new Matriz(this);
		changes[idChange].setId(idChange);
		idChange = "INVERSA (" + idChange + ")";
		changes[idChange] = new Matriz(this.parent.identidad);
		changes[idChange].setId(idChange);
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
		allChanges = [];
		// _self.elementos.forEach(function(reglon, index) {
		this.reducida = new Matriz(_self);
		this.reducida.setId("REDUCIDA(" + _self.id + ")");
		this.reducida.parent = this;
		this.reducida.validarIdentidad();
		var test = 0;
		for (var i = 0; i < _self.reducida.elementos.length; i++) {
			console.log(_self.reducida.elementos[i][i])
			var tieneCero = false;
			if (_self.reducida.elementos[i][i].equals(0)) {
				console.log(i)
				for (var j = i + 1; j < _self.reducida.elementos.length; j++) {
					console.log(_self.reducida.elementos[j][i].toString())
					if (!_self.reducida.elementos[j][i].equals(0)) {
						console.log(_self.reducida.elementos[j][i].toString())
						_self.reducida.cambiarReglon(i, j);
						if (this.esCuadrada) {
							_self.identidad.cambiarReglon(i, j);
						}
						tieneCero = true;
						break;
					}
				}
				if (tieneCero) {
					i--;
					continue;
				}
			}
			// console.log(_self.reducida.toString());
			var changes = _self.reducida.volverUno(i);
			console.log(_self.reducida.toString(changes));
			if (changes) {
				allChanges.push(changes)
			}
			var changes2 = _self.reducida.columnaACero(i);
			console.log(_self.reducida.toString(changes2));
			if (changes2) {
				allChanges.push(changes2)
			}
		};
		console.log(_self.reducida.toString());

		allChanges.forEach(function(ele) {
			$.each(ele, function(index, matrix) {
		    	$("#resultados").append(matrix.toHTML());
			 })
		});
    	$("#resultados").append(this.reducida.toHTML());
    	$("#resultados").append(this.identidad.toHTML());
	}

	this.columnaACero = function(reglon) {
		var changes = {};
		var invertChanges = {};
		for (var i = 0; i < this.elementos.length; i++) {
			if (i === reglon) {
				continue;
			}
			var primeraEntrada = new fraccion(this.elementos[i][reglon].numerador, this.elementos[i][reglon].denominador);
			if (primeraEntrada.equals(0))
				continue;
			var operacion = primeraEntrada.esNegativa() && !this.elementos[reglon][i].esNegativa() ? "sumar" : "restar" ;
			console.log(operacion)
			for (var j = 0; j < this.elementos[reglon].length; j++) {
				if (this.elementos[reglon][j].equals(0)) {
					continue;
				}
				var pigote = new fraccion(this.elementos[reglon][j].toString());
				if (this.parent.esCuadrada) {
					var pigoteIdentidad = new fraccion(this.parent.identidad.elementos[reglon][j].toString());
				}
				if (operacion === "sumar") {
					pigote.multiplicar(-1);
					if (this.esCuadrada) {
						pigoteIdentidad.multiplicar(-1);
					}
				}
				this.elementos[i][j][operacion](PRODUCTO(primeraEntrada, pigote));
				if (this.parent.esCuadrada) {
					this.parent.identidad.elementos[i][j][operacion](PRODUCTO(primeraEntrada, pigoteIdentidad));
				}
			}
			var idChange = "R" + (i + 1) + "-> R" + (i + 1) + " - (" + primeraEntrada.toString() + ") * R" + (reglon + 1);
			changes[idChange] = new Matriz(this);
			changes[idChange].setId(idChange);
			idChange = "INVERSA (" + idChange + ")";
			changes[idChange] = new Matriz(this.parent.identidad);
			changes[idChange].setId(idChange);
		}
		return changes;
	}

	this.reducir = function() {

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
		this.toHTML(changes);
		return string;
	}

	this.toHTML = function(changes) {
		var _self = this;
		this.domElement.empty();
		var id = $("<input disabled		></input>");
		id.bind("keyup", function(ev){
			_self.setId(this.value);
		});
		this.domElement.append("<span>ID: </span>");
		this.domElement.append(id);
		var table = $("<table></table>");
		this.elementos.forEach(function(fila, FILA) {
			// string += "[";
			var row = $("<tr></tr>")
			if (changes) {
				row.append("<td class='change'>" + (changes[FILA] || ' ') + "</td>");
			}
			fila.forEach(function(elemento, COLUMNA) {
				row.append(
					$("<td class='elemento'></td>").append(
						$("<input i= '" + FILA + "' j='" + COLUMNA + "' value='" + elemento.toString() + "'>").keyup(function() {
							_self.actualizar();
						})
					)
				);
			})
			row.append(_self.getActions("FILA", FILA));
			table.append(row);
		});
		var actionsRow = $("<tr></tr>");
		for (var i = 0; i < this.columnas; i++) {
			actionsRow.append($("<td></td>").append(_self.getActions("COLUMNA", i)))
		}
		table.append(actionsRow);

		this.domElement.append(table);
		_self.setId(_self.id);
		return this.domElement;
		// this.domElement.append(this.getActions());
		// $(".container").append(this.domElement);
	}

	this.getActions = function(tipo, posicion) {
		var _self = this;
		var dropdown = $("<div class='dropdown'></div>") 
		var button = $('<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="caret"></span></button>'
		);
		dropdown.append(button);

		var lista = $('<ul class="dropdown-menu" aria-labelledby="dropdownMenu1"><ul>');
		// for (var i = 0; i < actions.length; i++) {

		if (tipo === "COLUMNA") {
			var addColumn = $("<li posicion='" + posicion + "'><a href='#'>AGREGAR</a></li>");
			addColumn.bind("click", function() {
				_self.actualizar();
				var newColumn = [];
				for (var i = 0; i < _self.filas; i++) {
					newColumn[i] = 0;
				}
				_self.agregarColumna(newColumn, posicion);
				_self.toString();
			});
			lista.append(addColumn);
			var deleteColumn = $("<li posicion='" + posicion + "'><a href='#'>ELIMINAR</a></li>");
			deleteColumn.bind("click", function() {
				_self.actualizar();
				_self.eliminarColumna(posicion);
				_self.toString();
			});
			lista.append(deleteColumn);
		} else if (tipo === "FILA") {
			var addRow = $("<li posicion='" + posicion + "'><a href='#'>AGREGAR</a></li>");
			addRow.bind("click", function() {
				_self.actualizar();
				var newRow = [];
				for (var i = 0; i < _self.columnas; i++) {
					newRow[i] = 0;
				}
				_self.agregarFila(newRow, posicion);
				_self.toString();
			});
			lista.append(addRow);
			var deleteRow = $("<li posicion='" + posicion + "'><a href='#'>ELIMINAR</a></li>");
			deleteRow.bind("click", function() {
				_self.actualizar();
				_self.eliminarFila(posicion);
				_self.toString();
			});
			lista.append(deleteRow)
		}

		// }
		// lista.append(actions);
		dropdown.append(lista);
		return dropdown;
	}

	this.actualizar = function() {
		var _self = this;
		this.domElement.find('.elemento > input').each(function(index, elemento) {
			_self.elementos[$(elemento).attr("i")][$(elemento).attr("j")] = new fraccion(elemento.value);
		});
	}
	this.actualizarDOM = function() {
		var _self = this;
		this.domElement.find('.elemento > input').each(function(index, elemento) {
			console.log(elemento.value)
			elemento.value = _self.elementos[$(elemento).attr("i")][$(elemento).attr("j")].toString();
		});
	}

	this.sumar = function(otraMatriz) {
		if (otraMatriz.filas !== this.filas || this.columnas !== otraMatriz.columnas) {
			throw "NO SE PUEDEN SUMARA LAS MATRIZCES";
		}

		for (var i = 0; i < this.filas; i++) {
			for (var j = 0; j < this.columnas; j++) {
				this.elementos[i][j].sumar(otraMatriz.elementos[i][j]);
			}
		}
	}

	this.restar = function(otraMatriz) {
		if (otraMatriz.filas !== this.filas || this.columnas !== otraMatriz.columnas) {
			throw "NO SE PUEDEN SUMARA LAS MATRIZCES";
		}
		var temp = new Matriz(otraMatriz);
		temp.multiplicar(-1);
		this.sumar(temp);
	}

	this.multiplicar = function(otraMatriz) {
		if (!isNaN(otraMatriz) || otraMatriz instanceof fraccion) {
			for (var i = 0; i < this.filas; i++) {
				for (var j = 0; j < this.columnas; j++) {
					this.elementos[i][j].multiplicar(new fraccion(otraMatriz));
				}
			}
		} else if (otraMatriz instanceof Matriz) {
			if (this.columnas !== otraMatriz.filas) {
				throw "NO SE PUEDEN MULTIPLICAR LAS MATRICES";
			}
			var nuevosValores = [[]];
			for (var i = 0; i < this.filas; i++) {
				nuevosValores[i] = [];
				for (var j = 0; j < otraMatriz.columnas; j++) {
					nuevosValores[i][j] = new fraccion(0);
					for (var j2 = 0; j2 < this.columnas; j2++) {
						nuevosValores[i][j].sumar(PRODUCTO(this.elementos[i][j2], otraMatriz.elementos[j2][j]));
					}
				}
			}
			this.elementos = nuevosValores;
			this.filas = undefined;
			this.columnas = undefined;
			this.setElementos();
		}
	}

	this.setId = function(newId) {
		
		this.id = newId;
		this.domElement.find("> input").val(newId);
		this.domElement.attr("id", newId);
	}

	this.transpuesta = function() {
		var nuevos = [];
		this.actualizar();
		for (var j = 0; j < this.columnas; j++) {
			nuevos.push([]);
			for (var i = 0; i < this.filas; i++) {
				console.log(this.elementos[i][j].toString())
				nuevos[j].push(this.elementos[i][j].toString());
			}
		}
		return new Matriz(nuevos, "TRANS(" + this.id + ")")
	}
	/*
		Constructor
	*/
	var filas, elementos;
	if (Array.isArray(firstParameter)) {
		this.filas = undefined;
		this.columnas = undefined;
		this.id = id;
		this.elementos = JSON.parse(JSON.stringify(firstParameter));
		this.setElementos();
	} else if (firstParameter instanceof Matriz) {
		this.id = firstParameter.id;
		this.elementos = [];
		for (var i = 0; i < firstParameter.filas; i++) {
			this.elementos[i] = [];
			for (var j = 0; j < firstParameter.columnas; j++) {
				this.elementos[i][j] = new fraccion(firstParameter.elementos[i][j]);
			}
		}
		this.setElementos();
	}
	this.domElement = $("<div class='matriz' id='MATRIZ-" + this.id +"'><div>");


	// else {
	// 	this.filas = firstParameter;
	// 	if (elementos !== undefined) {
	// 		this.setElementos(firstParameter);
	// 	} else {
	// 		this.elementos = [[]];
	// 	}
	// }
}