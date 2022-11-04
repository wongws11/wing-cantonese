import { JyutpingMap } from '../data/JyutpingMap';

export type JyutpingChar = {
	sing: 'b' |
	'p' |
	'm' |
	'f' |
	'd' |
	't' |
	'n' |
	'l' |
	'g' |
	'k' |
	'gw' |
	'kw' |
	'z' |
	'c' |
	's' |
	'h' |
	'ng' |
	'j' |
	'w' |
	'';
	wan: 'aa' |
	'aai' |
	'aau' |
	'aam' |
	'aan' |
	'aang' |
	'aap' |
	'aat' |
	'aak' |
	'a' |
	'ai' |
	'au' |
	'am' |
	'an' |
	'ang' |
	'ap' |
	'at' |
	'ak' |
	'e' |
	'ei' |
	'eu' |
	'em' |
	'eng' |
	'ep' |
	'ek' |
	'i' |
	'iu' |
	'im' |
	'in' |
	'ing' |
	'ip' |
	'it' |
	'ik' |
	'o' |
	'oi' |
	'ou' |
	'on' |
	'ong' |
	'ot' |
	'ok' |
	'u' |
	'ui' |
	'un' |
	'ung' |
	'ut' |
	'uk' |
	'oe' |
	'oeng' |
	'oet' |
	'oek' |
	'eoi' |
	'eon' |
	'eot' |
	'yu' |
	'yun' |
	'yut' |
	'm' |
	'ng' |
	'';
	tone: 1 | 2 | 3 | 4 | 5 | 6 | null;
};

const STOPS = ['b', 'p', 'd', 't', 'g', 'k', 'gw', 'kw', 'z', 'c'];
const FRICATIVES = ['f', 's', 'h'];
const ENTERSOUNDS = ['p', 't', 'k'];

/**
 * A jyutping character
 * @char Chinese character (Tradtional Chinese only)
 */
export default class Jyutping {
	sing: JyutpingChar['sing'] = '';
	wan: JyutpingChar['wan'] = '';
	tone: JyutpingChar['tone'] = null;

	jyutpingChar: JyutpingChar | null;

	constructor(char: string) {
		if (JyutpingMap[char] == null) {
			this.jyutpingChar = null;
			return
		}

		this.jyutpingChar = JyutpingMap[char];
		this.sing = this.jyutpingChar.sing;
		this.wan = this.jyutpingChar.wan;
		this.tone = JyutpingMap[char].tone;
	}

	noData = (): boolean => {
		return this.jyutpingChar === null ? true : false;
	}

	isStop = (): boolean => {
		return STOPS.includes(this.sing);
	}

	isFricative = (): boolean => {
		return FRICATIVES.includes(this.sing);
	}

	/**
	 * 平聲
	 * @returns true if it is a level tone
	 */
	isPing = (): boolean => {
		return (this.tone === 1 || this.tone === 4);
	}

	/**
	 * 陰陽
	 * @returns true if Yam; false if Yeung; null if there is no tone.
	 */
	isYam = (): boolean | null => {
		if (this.tone === null) return null;
		return this.tone <= 3 ? true : false;
	}

	static getSing = (jyutpingChar: JyutpingChar): string => {
		let tail = jyutpingChar.wan.slice(-1);
		if (!ENTERSOUNDS.includes(tail)) {
			switch (jyutpingChar.tone) {
				case 1:
					return '陰平';
				case 2:
					return '陰上';
				case 3:
					return '陰去';
				case 4:
					return '陽平';
				case 5:
					return '陽上';
				case 6:
					return '陽去';
				default:
					return '';
			}
		} else {
			switch (jyutpingChar.tone) {
				case 1:
					return '陰入';
				case 3:
					return '中入';
				case 6:
					return '陽入';
				default:
					return '';
			}
		}
	}
}