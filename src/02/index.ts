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

		return row
			.split(": ")[1]
			.split("; ")
			.map((game) =>
				Object.fromEntries(
					game.split(", ").map((item) => {
						const [a, b] = item.split(" ");
						return [b, parseInt(a)];
					}),
				),
			);
	})) {
		const isMain = name === "input.txt";
		console.log(`------------- ${name} -------------`);
		if (isMain) {
			// continue;
		}

		let score = 0;
		let score2 = 0;

		const config = {
			red: 12,
			green: 13,
			blue: 14,
		};

		for (let gameId = 0; gameId < data.length; gameId++) {
			let ok = true;
			let min = { red: 0, green: 0, blue: 0 };

			for (const step of data[gameId]) {
				for (const color in config) {
					if (step[color] > config[color]) {
						ok = false;
					}

					if (step[color] > min[color]) {
						min[color] = step[color];
					}
				}
			}

			score2 += min.red * min.green * min.blue;

			if (ok) {
				score += gameId + 1;
			}
		}

		console.log("Task1", score);
		// isMain && (await copySolution(1, score));
		// isMain && (await submit(1, score));

		console.log("Task2", score2);
		// isMain && (await copySolution(2, score2));
		// isMain && (await submit(2, score2));
	}
})();
