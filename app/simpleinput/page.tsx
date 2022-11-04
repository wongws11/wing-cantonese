'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { getChars, charsToPick } from './doSimplex';

const SimpleInputPage = () => {
	const [input, setInput] = useState<string>('');
	const [toPick, setToPick] = useState<charsToPick | null>(null);
	const [output, setOutput] = useState<string>('');

	const [currPage, setCurrPage] = useState<number | null>(null);
	const [maxPage, setMaxPage] = useState<number | null>(null);

	const handleOutput = (char: string) => {
		setOutput(output + char);
		setInput('');
	};

	const handleInput = (inputString: string): void => {
		const alphabets: string = inputString.replace(/[^a-z]/gi, '').toLowerCase();
		let num: number | null = inputString.replace(/[^0-9]/gi, '') ? Number(inputString.replace(/[^0-9]/gi, '')) : null;
		if (num === 0) num = 10;
		const key = inputString.replace(/[^-=]/gi, '') ? inputString.replace(/[^-=]/gi, '') : null;
		if (toPick && maxPage) {
			switch (key) {
				case '=':
					currPage === maxPage ? setCurrPage(0) : setCurrPage(currPage! + 1);
					break;
				case '-':
					currPage === 0 ? setCurrPage(maxPage) : setCurrPage(currPage! - 1);
			}
		}

		if (toPick && currPage !== null && num && toPick.charArray[currPage][num - 1]) {
			handleOutput(toPick.charArray[currPage][num - 1]);
			return;
		}

		setInput(alphabets);
	};

	useEffect(() => {
		setToPick(getChars(input));
	}, [input]);

	useEffect(() => {
		if (!toPick) return;
		setCurrPage(0);
		setMaxPage(toPick.pages);
		return () => {
			setCurrPage(null);
			setMaxPage(null);
		};
	}, [toPick]);

	const pickingList = (toPick: charsToPick) => {
		return (
			<div className='mx-auto flex flex-row justify-center border bg-blue-200 rounded max-w-lg'>
				{toPick.charArray.map((list: string[], page: number) => {
					return (
						<div className={'flex flex-col ' + (page === currPage && 'bg-yellow-500')} key={page}>
							{list.map((char: string, selectKey: number) => {
								if (selectKey === 9) selectKey = 0;
								else selectKey = selectKey + 1;
								return (
									<span key={selectKey}>
										{char} {selectKey}
									</span>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className='container mx-auto text-center'>
			<Head>
				<title>速成輸入法</title>
				<meta name='description' content='Simple Input' />
			</Head>
			<div>{output && output}</div>
			<input type='text' className='border border-black rounded my-5' value={input} onChange={(e) => handleInput(e.target.value)} />
			{toPick && pickingList(toPick)}
			<div>{toPick && toPick.pages}</div>
		</div>
	);
};

export default SimpleInputPage;
