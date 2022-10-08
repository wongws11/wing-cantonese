import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { JyutpingDict, JyutpingChar } from '../data/faancitData';

const doFaancit = (inputChars: string): JyutpingChar | null => {
  if (inputChars.length !== 2) return null;

  const upperChar = inputChars[0];
  const lowerChar = inputChars[1];

  if (JyutpingDict[upperChar] == null || JyutpingDict[lowerChar] == null) return null;

  const upperJyutping = JyutpingDict[upperChar];
  const lowerJyutping = JyutpingDict[lowerChar];

  if (lowerJyutping.wan === '') return null; // 反切下字無元音

  // 陰陽
  let upperYam;
  let lowerYam;
  if (upperJyutping.tone! <= 3) {
    upperYam = true;
  } else {
    upperYam = false;
  }
  if (lowerJyutping.tone! <= 3) {
    lowerYam = true;
  } else {
    lowerYam = false;
  }

  // 上字塞音
  let upperStop;
  const stops = ['b', 'p', 'd', 't', 'g', 'k', 'gw', 'kw', 'z', 'c'];
  if (stops.includes(upperJyutping.sing)) {
    upperStop = true;
  } else {
    upperStop = false;
  }

  // 下字平聲
  let lowerPing;
  if (lowerJyutping.tone === 1 || lowerJyutping.tone === 4) {
    lowerPing = true;
  } else {
    lowerPing = false;
  }

  let outSing: JyutpingChar['sing'];
  let outWan: JyutpingChar['wan'];
  let outTone: JyutpingChar['tone'];

  // 聲母
  if (!upperYam && upperStop) {
    if (lowerPing) {
      switch (upperJyutping.sing) {
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
      switch (upperJyutping.sing) {
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
  } else if (upperJyutping.sing === 'f') {
    // 古無輕唇音
    outSing = 'b';
  } else {
    outSing = upperJyutping.sing;
  }

  // 韻母
  outWan = lowerJyutping.wan;

  // 聲調
  if (upperYam && !lowerYam) {
    // console.log('上字陰下字陽');
    switch (lowerJyutping.tone) {
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
    switch (lowerJyutping.tone) {
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
    outTone = lowerJyutping.tone;
  }

  const fricative = ['f', 's', 'h'];
  if (!upperYam && (stops.includes(upperJyutping.sing) || fricative.includes(upperJyutping.sing))) {
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

  return outJyutping;
};

const getSing = (char: JyutpingChar): string => {
  let tail = char.wan.slice(-1);
  const enterSound = ['p', 't', 'k']
  if (!enterSound.includes(tail)) {
    switch (char.tone) {
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
    switch (char.tone) {
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

const Faancit: NextPage = () => {
  const [toFaancit, setToFaancit] = useState<string>('');

  const outputChars: JyutpingChar | null = doFaancit(toFaancit);
  const outputSing: string | null = outputChars ? getSing(outputChars): null;

  return (
    <div className='container mx-auto text-center'>
      <Head>
        <title>粵語反切轉換</title>
        <meta name='description' content='Cantonese Faancit' />
      </Head>
      <h1 className='mt-5 text-xl'>粵語反切轉換</h1>
      <div className='input my-20'>
        <input
          type='text'
          id='toFaancit'
          placeholder='輸入反切字'
          value={toFaancit}
          onChange={(e) => setToFaancit(e.target.value.trim())}
        />
        <span>切</span>
      </div>
      <div className='output'>
        <p>{outputChars && outputChars.sing + outputChars.wan + outputChars.tone} {outputSing && outputSing}</p>
      </div>
    </div>
  );
};

export default Faancit;
