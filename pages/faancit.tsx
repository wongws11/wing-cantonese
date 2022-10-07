import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { JyutpingDict, JyutpingChar } from '../data/faancit';

const doFaancit = (inputChars: string): JyutpingChar | null => {
  if (inputChars.length !== 2) return null;

  const upperChar = inputChars[0];
  const lowerChar = inputChars[1];

  if (JyutpingDict[upperChar] == null || JyutpingDict[lowerChar] == null) return null;

  return JyutpingDict[upperChar];
};

const Faancit: NextPage = () => {
  const [toFaancit, setToFaancit] = useState<string>('');

  const outputChars: JyutpingChar | null = doFaancit(toFaancit);

  return (
    <div className='container mx-auto'>
      <Head>
        <title>粵語反切轉換</title>
        <meta name='description' content='Cantonese Faancit' />
      </Head>
      <h1>粵語反切轉換</h1>
      <div className='input'>
        <input
          type='text'
          id='toFaancit'
          placeholder='輸入反切字'
          value={toFaancit}
          onChange={(e) => setToFaancit(e.target.value)}
        />
        <span>切</span>
      </div>
      <div className='output'>
        <p>{outputChars && outputChars.sing}</p>
      </div>
    </div>
  );
};

export default Faancit;
