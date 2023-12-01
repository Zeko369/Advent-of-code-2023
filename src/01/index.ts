// @ts-check
import * as l from "lodash-es";

import { submit, copySolution } from "~/lib/submit.ts";

import * as g from "~/shared/globals.ts";
import { loadData } from "~/shared/load.ts";

(async () => {
	for (const [name, data] of await loadData(import.meta.url, (row) => {
		// 1 => 1
		// return parseInt(row);

		// 123 123 123 => [123, 123, 123]
		// return row.split(" ").map(Number);
		// 123 => [1, 2, 3]
		// return row.split("").map(Number);

		// 1 2 3 => ['1', '2', '3']
		// return row.split(" ");

		// const [a, b] = row.split(" ");
		// return /** @tpe {const} */ ([a, parseInt(b)]);

		return row;
	})) {
		const isMain = name === "input.txt";
		console.log(`------------- ${name} -------------`);
		if (isMain) {
			// continue;
		}

		let score = data
			.map((row) => {
				const numbers = row.match(/\d/g);
				return Number(numbers.at(0) + numbers.at(-1));
			})
			.reduce(g.sum);

		const digitsInLetters = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		const regex = new RegExp(`${digitsInLetters.join("|")}|\\d`, "g");

		let score2 = data
			.map((row) => {
				// const matches = [...row.match(regex)];
				const matches = [];
				for (let i = 0; i < row.length; i++) {
					if (Number.isNaN(Number(row[i]))) {
						for (let j = 0; j < digitsInLetters.length; j++) {
							if (row.slice(i, i + digitsInLetters[j].length) === digitsInLetters[j]) {
								matches.push(digitsInLetters[j]);
								i++;
								break;
							}
						}
					} else {
						matches.push(row[i]);
					}
				}

				const get = (index) => {
					if (digitsInLetters.includes(matches.at(index))) {
						return digitsInLetters.indexOf(matches.at(index)) + 1;
					}

					return Number(matches.at(index));
				};

				let number1 = get(0);
				let number2 = get(-1);

				return number1 * 10 + number2;
			})
			.reduce(g.sum);

		console.log("Task1", score);
		// isMain && (await copySolution(1, score));
		// isMain && (await submit(1, score));

		console.log("Task2", score2);
		// isMain && (await copySolution(2, score2));
		// isMain && (await submit(2, score2));
	}
})();
