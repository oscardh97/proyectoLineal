
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
			var mcd = Math.abs(this.gcd(this.numerador, this.denominador));
			this.numerador /= mcd;
			this.denominador /= mcd;
		}

		this.sumar = function(n) {
			if (!isNaN(n)) {
				n = new fraccion(n,1);
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

			this.numerador *= this.denominador;
			this.denominador *= this.numerador;
			this.simplify();
		}

		this.toString = function() {
			if (Math.abs(this.denominador) === 1) {
				return (this.numerador / this.denominador < 0 ? "-" : "") + Math.abs(this.numerador);
			}
			return this.numerador + "/" + this.denominador;
		}

		this.esEntera = function() {
			return this.numerador % this.denominador === 0;
		}
		
		this.equals = function(n1) {
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
			this.simplify();
		} 
		if (numerador === undefined && denominador === undefined) {
			this.esNula = true;
		} else if (denominador !== 0) {
			if (denominador === undefined)
				denominador = 1;
			this.numerador = numerador;
			this.denominador = denominador;
			this.simplify();
		} else {
			throw "EL DENOMINADOR NO PUEDE SER CERO";
		}
	 	// this.view = $("../views/matriz.html")
	}