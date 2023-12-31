// @ts-check

import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.SESSION_COOKIE) {
	throw new Error("SESSION_COOKIE not set");
}

const TEMPLATE_PATH = join(dirname(fileURLToPath(import.meta.url)), "../template/index.ts");

const YEAR = 2023;
const DAY = process.env.DATE ? parseInt(process.env.DATE) : new Date().getDate();

const baseURL = `https://adventofcode.com/${YEAR}/day/${DAY}`;

(async () => {
	// const date = new Date();
	// if (date.getMonth() !== 11) {
	// 	throw new Error("Not December");
	// }

	const baseDir = join(import.meta.dir, "../src", `${DAY < 10 ? `0${DAY}` : DAY}`);
	try {
		await stat(baseDir);
	} catch (err) {
		console.log(`Creating ${baseDir}`);
		await mkdir(baseDir);

		await copyFile(TEMPLATE_PATH, join(baseDir, "index.ts"));

		await writeFile(join(baseDir, "input.txt"), "");
		await writeFile(join(baseDir, "input_demo.txt"), "");
	}

	while (true) {
		const time = new Date();
		if (time.getHours() >= 6) {
			const res = await fetch(`${baseURL}/input`, {
				headers: { Cookie: `session=${process.env.SESSION_COOKIE}` },
			});

			if (res.status === 404) {
				console.log("Not available yet");

				console.log("Wait a sec...");
				await new Promise((resolve) => setTimeout(resolve, 1000));
				continue;
			}

			if (res.status !== 200) {
				throw new Error(`Unexpected status code: ${res.status}`);
			}

			const input = await res.text();
			await writeFile(join(baseDir, "input.txt"), input.trim(), "utf8");

			const demoRes = await fetch(baseURL);
			const demoHTML = await demoRes.text();
			const demoInput = demoHTML.match(/<pre><code>(.*?)<\/code><\/pre>/s);
			if (demoInput) {
				await writeFile(join(baseDir, "input_demo.txt"), demoInput[1].trim(), "utf8");
			} else {
				console.log("No demo input found");
			}

			console.log("Done");
			break;
		}
	}
})();
