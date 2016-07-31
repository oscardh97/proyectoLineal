
	var fraccion = function(numerador, denominador) {
		
		this.multiplicar = function(n1) {
			if (!isNaN(n)) {
				n = new fraccion(n,1);
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
			console.log(this.numerador, this.denominador)
			var mcd = Math.abs(this.gcd(this.numerador, this.denominador));
			this.numerador /= mcd;
			this.denominador /= mcd;
		}

		this.sumar = function(n) {
			console.log(n)
			if (!isNaN(n)) {
				n = new fraccion(n,1);
			}
			console.log(n)
			this.numerador = this.numerador * n.denominador + this.denominador * n.numerador;
			this.denominador *= n.denominador;
			this.simplify();
		}



		this.dividir = function(n) {
			if (!isNaN(n)) {
				n = new fraccion(n,1);
			}

			this.numerador *= this.denominador;
			this.denominador *= this.numerador;
			this.simplify();
		}
		if (numerador === undefined && denominador === undefined) {
			this.esNula = true;
		} else if (denominador !== 0) {
			this.numerador = numerador;
			this.denominador = denominador;
			this.simplify();
		} else {
			throw "EL DENOMINADOR NO PUEDE SER CERO";
		}

		this.toString = function() {
			if (this.denominador === 1) {
				return this.numerador;
			}
			return this.numerador + "/" + this.denominador;
		}

		this.esEntera = function() {
			return this.numerador % this.denominador === 0;
		}
	 	this.view = $("../views/matriz.html")
	}