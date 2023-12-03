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
		// return /** @type {const} */ ([a, parseInt(b)]);

		return row;
	})) {
		const isMain = name === "input.txt";
		console.log(`------------- ${name} -------------`);
		if (isMain) {
			// continue;
		}

		let score = 0;
		let score2 = 0;

		const isNum = (char) => char >= "0" && char <= "9";
		const gearNumbers: Record<string, number[]> = {};

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				if (!isNum(data[i][j])) {
					continue;
				}

				let lastChar = j;
				for (lastChar = j; lastChar < data[i].length; lastChar++) {
					if (!isNum(data[i][lastChar + 1])) {
						break;
					}
				}

				const number = Number(data[i].slice(j, lastChar + 1));
				const positions: [number, number][] = [];
				for (let k = j - 1; k <= lastChar + 1; k++) {
					positions.push([i - 1, k]);
					if (k === j - 1 || k === lastChar + 1) {
						positions.push([i, k]);
					}
					positions.push([i + 1, k]);
				}

				// console.log(number);
				// for (let o = 0; o < data.length; o++) {
				// 	console.log(
				// 		data[o].split("").map((char, ind) => {
				// 			if (positions.some((pos) => pos[0] === o && pos[1] === ind)) {
				// 				return char;
				// 			} else if (o === i && ind >= j && ind <= lastChar) {
				// 				return char;
				// 			} else {
				// 				return "|";
				// 			}
				// 		}),
				// 	);
				// }

				const gears = positions.filter(
					(pos) => data[pos[0]] !== undefined && data[pos[0]][pos[1]] !== undefined && data[pos[0]][pos[1]] === "*",
				);
				if (gears.length === 1) {
					const gear = gears[0];
					gearNumbers[`${gear[0]}-${gear[1]}`] ||= [];
					gearNumbers[`${gear[0]}-${gear[1]}`].push(number);
				}

				if (
					positions.some(
						(pos) =>
							data[pos[0]] !== undefined &&
							data[pos[0]][pos[1]] !== undefined &&
							data[pos[0]][pos[1]] !== "." &&
							!isNum(data[pos[0]][pos[1]]),
					)
				) {
					score += number;
				} else {
					// console.log(number);
				}

				j = lastChar;
			}
		}

		score2 = Object.values(gearNumbers)
			.filter((values) => values.length === 2)
			.map((gears) => gears[0] * gears[1])
			.reduce(g.sum);

		console.log("Task1", score);
		// isMain && (await copySolution(1, score));
		// isMain && (await submit(1, score));

		console.log("Task2", score2);
		// isMain && (await copySolution(2, score2));
		// isMain && (await submit(2, score2));
	}
})();
