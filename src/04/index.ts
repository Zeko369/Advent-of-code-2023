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
			.split("|")
			.map((row) => row.trim().split(" ").filter(Boolean).map(Number));
	})) {
		const isMain = name === "input.txt";
		console.log(`------------- ${name} -------------`);
		if (isMain) {
			// continue;
		}

		let score = 0;
		let score2 = 0;

		let scores = [];
		for (let i = 0; i < data.length; i++) {
			let count = 0;
			const value = data[i][1].reduce((game, number) => {
				if (data[i][0].includes(number)) {
					count++;
					if (game === 0) {
						return game + 1;
					}
					return game * 2;
				}

				return game;
			}, 0);

			scores.push({ value, count });
			score += value;
		}

		const obj: Record<number, number> = {};
		const processScore = (index) => {
			if (obj[index] === undefined) {
				obj[index] = 0;
			}
			obj[index]++;

			let tmp = scores[index].value;
			for (let i = index + 1; i < index + 1 + scores[index].count; i++) {
				if (scores[i]) {
					tmp += processScore(i);
				}
			}

			return tmp;
		};

		for (let i = 0; i < scores.length; i++) {
			processScore(i);
		}

		score2 = Object.values(obj).reduce(g.sum);

		console.log("Task1", score);
		// isMain && (await copySolution(1, score));
		// isMain && (await submit(1, score));

		console.log("Task2", score2);
		// isMain && (await copySolution(2, score2));
		// isMain && (await submit(2, score2));
	}
})();
