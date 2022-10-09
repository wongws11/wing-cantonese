import { JyutpingDict } from './jyutpingDict';

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

/**
 * A jyutping character
 * @char Chinese character (Tradtional Chinese only)
 */
export default class Jyutping {
	sing: JyutpingChar['sing'] = '';
	wan: JyutpingChar['wan'] = '';
	tone: JyutpingChar['tone'] = null;

	jyutpingChar: JyutpingChar | null;

	public constructor(char: string) {
		if (JyutpingDict[char] == null) {
			this.jyutpingChar = null;
			return
		}
		
		this.jyutpingChar = JyutpingDict[char];
		this.sing = this.jyutpingChar.sing;
		this.wan = this.jyutpingChar.wan;
		this.tone = JyutpingDict[char].tone;
	}

	noData = (): boolean => {
		return this.jyutpingChar === null ? true : false;
	}

	static getSing = (jyutpingChar: JyutpingChar): string => {
		let tail = jyutpingChar.wan.slice(-1);
		const enterSound = ['p', 't', 'k']
		if (!enterSound.includes(tail)) {
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