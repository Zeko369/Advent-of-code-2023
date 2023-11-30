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
			continue;
		}

		let score = 0;
		let score2 = 0;

		for (let i = 0; i < data.length; i++) {
			console.log(data[i]);
		}

		console.log("Task1", score);
		// isMain && (await copySolution(1, score));
		// isMain && (await submit(1, score));

		console.log("Task2", score2);
		// isMain && (await copySolution(2, score2));
		// isMain && (await submit(2, score2));
	}
})();
