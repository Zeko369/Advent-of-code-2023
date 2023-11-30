export const sum = (a: number, b: number) => a + b;

export const sort = {
	asc: (a: number, b: number) => a - b,
	desc: (a: number, b: number) => b - a,
};

// Array.prototype.toSorted = function (lambda = (a) => a, direction = "asc") {
// 	return this.slice().sort((a, b) => {
// 		if (direction === "asc") {
// 			return lambda(a) - lambda(b);
// 		} else {
// 			return lambda(b) - lambda(a);
// 		}
// 	});
// };

// export const foo = "";
