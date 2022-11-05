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

const InputCharMap: Record<string, string> = {
	"a": 
		"日",
	"b": 
		"月",
	"c":
		"金",
	"d":
		"木",
	"e":
		"水",
	"f":
		"火",
	"g":
		"土",
	"h":
		"竹",
	"i":
		"戈",
	"j":
		"十",
	"k":
		"大",
	"l":
		"中",
	"m":
		"一",
	"n":
		"弓",
	"o":
		"人",
	"p":
		"心",
	"q":
		"手",
	"r":
		"口",
	"s":
		"尸",
	"t":
		"廿",
	"u":
		"山",
	"v":
		"女",
	"w":
		"田",
	"x":
		"難",
	"y":
		"卜",
	"z":
		"重"
}

export const alphaToChar = (aplhabet: string) => {
	if (aplhabet.length !== 1 || !InputCharMap[aplhabet]) return;
	else return InputCharMap[aplhabet];
}