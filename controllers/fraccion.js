
	var fraccion = function(numerador, denominador) {
		
		this.multiplicar = function(n1) {
			if (!isNaN(n1)) {
				n1 = new fraccion(n1,1);
			}
			this.numerador = n1.numerador * this.numerador;
			this.denominador = n1.denominador * this.denominador;
			this.simplify();
		}

		this.gcd = function(a, b){
			if (b == 0)
				return a;
			else
				return this.gcd(b, a % b);
		}
		this.simplify = function(){
			// console.log(this.numerador, this.denominador)/
			// console.log(this.toString());
			if (isNaN(this.numerador) || isNaN(this.numerador)) {
				// console.log(this)
				return
			}
			if (this.numerador === 0 || this.numerador === 0) {
				return;
			}
			var mcd = Math.abs(this.gcd(this.numerador, this.denominador));
			this.numerador /= mcd;
			this.denominador /= mcd;
			if (this.numerador < 0 && this.denominador < 0) {
				this.numerador = -this.numerador;
				this.denominador = -this.denominador;
			}
		}

		this.sumar = function(n) {
			if (!isNaN(n)) {
				if (n === 0) {
					return;
				}
				n = new fraccion(n,1);
			}
			if (n.numerador === 0) {
				return;
			}
			this.numerador = this.numerador * n.denominador + this.denominador * n.numerador;
			this.denominador *= n.denominador;
			this.simplify();
		}

		this.restar = function(n) {
			// console.log(n)
			if (!isNaN(n)) {
				n = new fraccion(n,1);
			}
			n.multiplicar(-1);
			// console.log(n.toString())
			this.sumar(n);
		}


		this.dividir = function(n) {
			if (!isNaN(n)) {
				n = new fraccion(n,1);
			}

			this.numerador *= n.denominador;
			this.denominador *= n.numerador;
			this.simplify();
		}

		this.toString = function() {
			if (this.numerador === 0) {
				return 0;
			}
			if (Math.abs(this.denominador) === 1) {
				return (this.esNegativa() ? "-" : "") + Math.abs(this.numerador);
			}
			return this.numerador + "/" + this.denominador;
		}

		this.esEntera = function() {
			return this.numerador % this.denominador === 0;
		}
		
		this.equals = function(n1) {
			if (n1 === 0) {
				return this.numerador === 0 || this.denominador === 0;
			}

			if (!isNaN(n1)) {
				n1 = new fraccion(n1, 1);
			}
			return this.numerador === n1.numerador && this.denominador === n1.denominador;
		}

		this.esNegativa = function() {
			return this.numerador / this.denominador < 0;
		}
		//CONSTRUCTOR
		if (numerador instanceof fraccion) {
			this.numerador = numerador.numerador;
			this.denominador = numerador.denominador;
			// console.log(this)
			this.simplify();
		} else if (numerador === undefined && denominador === undefined) {
			this.esNula = true;
		} else { //if (denominador !== 0) {
			if (isNaN(numerador)) {
				denominador = numerador.split("/")[1];
				numerador = numerador.split("/")[0];
				console.log(denominador)
			}
			if (denominador === undefined)
				denominador = 1;
			this.numerador = numerador;
			this.denominador = denominador;
			this.simplify();
		} 
		// else {
		// 	throw "EL DENOMINADOR NO PUEDE SER CERO";
		// }
	 	// this.view = $("../views/matriz.html")
	}