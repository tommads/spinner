import "jsdom-global/register";
var expect = require("chai").expect;
var assert = require("chai").assert;

import Spinner from "../src/js/index";
import { defaultHtml, lineLoaderHtml } from '../src/js/index';

describe("spinner", function() {

	describe("new default Spinner()", function() {
		let testSpinner;

		before(function(){
			testSpinner = new Spinner({container: '.spinner'});
		});

		it("should be a new instance of Spinner", function() {
			expect(testSpinner).to.be.an.instanceof(Spinner);
		});

		it("should have a state object", function() {
			assert.isObject(testSpinner.state);
		});

		it("should have a default theme", function() {
			expect(testSpinner.state.theme).to.equal("default");
		});

		it("should have a percentage of zero", function() {
			expect(testSpinner.state.percentage).to.equal(0);
		});

		it("should have a container class name of .spinner", function() {
			expect(testSpinner.state.container).to.equal(".spinner");
		});
	});

	describe("new loading Spinner()", function() {
		let testSpinner = new Spinner({container: '.progress-container', theme: 'lineLoader'});

		it("should be a new instance of Spinner", function() {
			expect(testSpinner).to.be.an.instanceof(Spinner);
		});

		it("should have a state object", function() {
			assert.isObject(testSpinner.state);
		});

		it("should have a percentage theme", function() {
			expect(testSpinner.state.theme).to.equal("lineLoader");
		});

		it("should have a percentage of zero", function() {
			expect(testSpinner.state.percentage).to.equal(0);
		});

		it("should have a container class name of .container", function() {
			expect(testSpinner.state.container).to.equal(".progress-container");
		});
	});

	describe(".add() default spinner", function() {
		let container;

		before(function(){
			container = document.createElement('div');
			container.classList.add('spinner');
			document.body.appendChild(container);

			let testSpinner = new Spinner({container: '.spinner'});
			testSpinner.add();
		});

		after(function() {
			document.body.removeChild(container);
		});

		it("should add the default spinner HTML to the div .spinner", function() {
			expect(document.querySelector(".spinner").innerHTML.trim()).to.equal(defaultHtml.trim());
		});
	});

	describe(".add() loading spinner", function() {
		describe("successful add() method", function() {
			let container;

			before(function(){
				container = document.createElement('div');
				container.classList.add('progress-container');
				document.body.appendChild(container);

				let testSpinner = new Spinner({container: '.progress-container', theme: 'lineLoader'});
				testSpinner.add();
			});

			after(function() {
				document.body.removeChild(container);
			});

			it("should add the percentage spinner HTML to the div .progress-container", function() {
				// expect(document.querySelector(".progress-container").innerHTML.trim()).to.equal(lineLoaderHtml.trim());
				expect(document.querySelector(".progress-container").innerHTML.replace(/\s/gmi, '')).to.equal(lineLoaderHtml.replace(/\s/gmi, ''));
			});
		});
	});

	describe(".update() percentage spinner", function() {
		let container, testSpinner;

		before(function(){
			container = document.createElement('div');
			container.classList.add('progress-container');
			document.body.appendChild(container);
			testSpinner = new Spinner({container: '.progress-container', theme: 'lineLoader'});
			testSpinner.add();
		});

		after(function() {
			document.body.removeChild(container);
		});

		it("should update the percentage value in the constructors state to 20", function() {
			testSpinner.update(20);
			expect(testSpinner.state.percentage).to.equal(20);
		});

		it("should update the percentage value in the constructors state to 40", function() {
			testSpinner.update(40);
			expect(testSpinner.state.percentage).to.equal(40);
		});

		it("should update the percentage value in the constructors state to 80", function() {
			testSpinner.update(80);
			expect(testSpinner.state.percentage).to.equal(80);
		});

		it("should update the percentage value in the constructors state to 100", function() {
			testSpinner.update(100);
			expect(testSpinner.state.percentage).to.equal(100);
		});
	});

	describe(".remove() default spinner", function() {
		describe(".remove() default successfully", function() {
			this.timeout(700);
			let container, testSpinner;

			before(function(){
				container = document.createElement('div');
				container.classList.add('container');
				document.body.appendChild(container);
				testSpinner = new Spinner({container: '.container'});
				testSpinner.add();
			});

			after(function() {
				document.body.removeChild(container);
			});

			beforeEach(function() {
				testSpinner.remove();
			});

			it("should remove the default spinner from the DOM", function(done) {
				setTimeout(function() {
					let container = document.querySelector(".container");
					expect(container.innerHTML).to.be.empty;
					done();
				}, 600);
			});
		});
	});

	describe(".remove() percentage spinner", function() {
		describe(".remove() spinner successfully", function() {
			this.timeout(700);
			let container, testSpinner;

			before(function(){
				container = document.createElement('div');
				container.classList.add('container');
				document.body.appendChild(container);
				testSpinner = new Spinner({container: '.container', theme: 'percentage'});
				testSpinner.add();
			});

			after(function() {
				document.body.removeChild(container);
			});

			beforeEach(function() {
				testSpinner.remove();
			});

			it("should remove the default spinner from the DOM", function(done) {
				setTimeout(function() {
					let container = document.querySelector(".container");
					expect(container.innerHTML).to.be.empty;
					done();
				}, 600);
			});
		});
	});
});
