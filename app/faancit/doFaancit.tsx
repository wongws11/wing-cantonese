import Jyutping, { JyutpingChar } from '../../components/Jyutping';

export const doFaancit = (inputChars: string): JyutpingChar[] | null => {
	if (inputChars.length !== 2) return null;

	const upperChar = new Jyutping(inputChars[0]);
	const lowerChar = new Jyutping(inputChars[1]);

	if (upperChar.noData() || lowerChar.noData()) return null;

	if (lowerChar.wan === '') return null; // 反切下字無元音

	// 陰陽
	const upperYam = upperChar.isYam();
	const lowerYam = lowerChar.isYam();
	// 上字塞音
	const upperStop = upperChar.isStop();
	// 下字平聲
	const lowerPing = lowerChar.isPing();

	let outSing: JyutpingChar['sing'];
	let outWan: JyutpingChar['wan'];
	let outTone: JyutpingChar['tone'];

	// 聲母
	if (!upperYam && upperStop) {
		if (lowerPing) {
			switch (upperChar.sing) {
				case 'b':
				case 'p':
					outSing = 'p';
					break;
				case 'd':
				case 't':
					outSing = 't';
					break;
				case 'g':
				case 'k':
					outSing = 'k';
					break;
				case 'gw':
				case 'kw':
					outSing = 'kw';
					break;
				case 'z':
				case 'c':
					outSing = 'c';
					break;
				default:
					break;
			}
		} else if (!lowerPing) {
			switch (upperChar.sing) {
				case 'b':
				case 'p':
					outSing = 'b';
					break;
				case 'd':
				case 't':
					outSing = 'd';
					break;
				case 'g':
				case 'k':
					outSing = 'g';
					break;
				case 'gw':
				case 'kw':
					outSing = 'gw';
					break;
				case 'z':
				case 'c':
					outSing = 'z';
					break;
				default:
					break;
			}
		}
	} else if (upperChar.sing === 'f') {
		// 古無輕唇音
		outSing = 'b';
	} else {
		outSing = upperChar.sing;
	}

	// 韻母
	outWan = lowerChar.wan;

	// 聲調
	if (upperYam && !lowerYam) {
		// console.log('上字陰下字陽');
		switch (lowerChar.tone) {
			case 4:
				outTone = 1;
				break;
			case 5:
				outTone = 2;
				break;
			case 6:
				outTone = 3;
				break;
			default:
				break;
		}
	} else if (!upperYam && lowerYam) {
		// console.log('上字陽下字陰');
		switch (lowerChar.tone) {
			case 1:
				outTone = 4;
				break;
			case 2:
				outTone = 5;
				break;
			case 3:
				outTone = 6;
				break;
			default:
				break;
		}
	} else {
		// console.log('上下字陰陽相等');
		outTone = lowerChar.tone;
	}

	if (!upperYam && (upperChar.isStop() || lowerChar.isFricative())) {
		if (outTone! === 2) {
			outTone = 3;
		} else if (outTone! === 5) {
			outTone = 6;
		}
	}

	const outJyutping: JyutpingChar = {
		sing: outSing!,
		wan: outWan,
		tone: outTone!,
	};

	return [outJyutping, upperChar, lowerChar];
};
