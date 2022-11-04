'use client';

import { SimplexMap } from "../../data/SimplexMap";

export type charsToPick = {
	pages: number,
	charList: string[],
	charArray: string[][]
}

export const getChars = (input: string): charsToPick | null => {
	if (input.length === 0 || !SimplexMap[input]) return null;
	const charList: string[] = SimplexMap[input];
	const pages: number = ~~(charList.length / 10);

	let charArray: string[][] = [];
	for (let i = 0; i <= pages; i++) {
		charArray.push(charList.slice(i*10, i*10 + 10));
	}

	return {
		pages: pages,
		charList: charList,
		charArray: charArray
	};
};
