import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const loadData = async <Item>(
	path: string,
	mapper: (row: string, index: number) => Item = (a) => a as Item,
	forcedData?: Array<[string, Item[]]>,
): Promise<Array<[string, Item[]]>> => {
	if (forcedData) {
		// @ts-ignore
		return forcedData.map(([name, rows]) => [name, rows.map(mapper)]);
	}

	const files = (await readdir(dirname(fileURLToPath(path)))).filter(
		(file) => file.endsWith(".txt") && !file.startsWith("_"),
	);

	return Promise.all(
		files.map(async (file) => {
			const filePath = join(dirname(fileURLToPath(path)), file);
			const data = await readFile(filePath, "utf8");
			return [file, data.split("\n").map(mapper)];
		}),
	);
};
