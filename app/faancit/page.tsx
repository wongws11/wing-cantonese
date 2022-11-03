'use client';

import Head from 'next/head';
import { useState } from 'react';

import Jyutping, { JyutpingChar } from '../../components/Jyutping';

import '../global.css';
import { doFaancit } from './doFaancit';

const FaancitPage = () => {
	const [toFaancit, setToFaancit] = useState<string>('');

	const outputChars: JyutpingChar[] | null = doFaancit(toFaancit);

	const outputChar: JyutpingChar | null = outputChars ? outputChars[0] : null;
	const upperChar: JyutpingChar | null = outputChars ? outputChars[1] : null;
	const lowerChar: JyutpingChar | null = outputChars ? outputChars[2] : null;

	const CharDetails = ({ char }: any) => (
		<>
			<span className='text-blue-500 '>{char.sing}</span>
			<span className='text-green-500'>{char.wan}</span>
			<span className=''>{char.tone}</span>
			<span className='ml-5'>{Jyutping.getSing(char)}聲</span>
		</>
	);

	return (
		<div className='container mx-auto text-left max-w-sm'>
			<Head>
				<title>粵語反切轉換</title>
				<meta name='description' content='Cantonese Faancit' />
			</Head>
			<h1 className='my-5 text-xl text-center'>粵語反切轉換</h1>
			<div className='input my-3'>
				<input
					className='border-solid border-2 rounded-md'
					type='text'
					id='toFaancit'
					placeholder='輸入反切字'
					value={toFaancit}
					onChange={(e) => setToFaancit(e.target.value.trim())}
				/>
				<span>切</span>
			</div>
			<div className='output flex flex-col justify-between h-28'>
				<p>
					上字：
					{upperChar && <CharDetails char={upperChar} />}
				</p>
				<p>
					下字：
					{lowerChar && <CharDetails char={lowerChar} />}
				</p>
				<p>
					反切讀音：
					{outputChar && <CharDetails char={outputChar} />}
				</p>
			</div>
		</div>
	);
};

export default FaancitPage;
