import { exec } from "node:child_process";
import { promisify } from "node:util";

export const submit = async (part: 1 | 2, flag: number | string) => {
	console.log(`Submitting flag ${flag} for part ${part}`);
};

const execAsync = promisify(exec);
export const copySolution = (solution: string) => {
	return execAsync(`echo "${solution}" | pbcopy`);
};
