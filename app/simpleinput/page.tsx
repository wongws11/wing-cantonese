'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { getChars, charsToPick, alphaToChar } from './doSimplex';

import styles from './simpleinput.module.css';

const SimpleInputPage = () => {
	const [input, setInput] = useState<string>('');
	const [toPick, setToPick] = useState<charsToPick | null>(null);
	const [output, setOutput] = useState<string>('');

	const [currPage, setCurrPage] = useState<number | null>(null);
	const [maxPage, setMaxPage] = useState<number | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const focusInput = () => {inputRef.current &&  inputRef.current.focus()}

	const handleOutput = (char: string) => {
		setOutput(output + char);
		setInput('');
		focusInput();
	};

	const prevPage = () => {
		currPage === maxPage ? setCurrPage(0) : setCurrPage(currPage! + 1);
		focusInput();
	}
	
	const nextPage = () => {
		currPage === 0 ? setCurrPage(maxPage) : setCurrPage(currPage! - 1)
		focusInput();
	}

	const handleInput = (inputString: string): void => {
		const alphabets: string = inputString.replace(/[^a-z]/gi, '').toLowerCase();
		let num: number | null = inputString.replace(/[^0-9]/gi, '') ? Number(inputString.replace(/[^0-9]/gi, '')) : null;
		if (num === 0) num = 10;
		let key = inputString.replace(/[^-=\s]/gi, '') ? inputString.replace(/[^-=\s]/gi, '') : null;
		if (toPick && maxPage) {
			if (key === ' ') key = '=';
			switch (key) {
				case '=':
					prevPage();
					break;
				case '-':
					nextPage();
					break;
			}
		}

		if (toPick && currPage !== null && num && toPick.charArray[currPage][num - 1]) {
			handleOutput(toPick.charArray[currPage][num - 1]);
			return;
		}

		setInput(alphabets);
	};

	// EventListener have serious performance issue when used like this
	// const handleKeydown = (key: string) => {
	// 	if (key === 'Backspace' && inputRef.current!.value.length === 0) {
	// 		setOutput(output.slice(0, -1));
	// 	} else if (key === 'Escape') {
	// 		navigator.clipboard.writeText(output);
	// 		setOutput('');
	// 	}
	// };

	// useEffect(() => {
	// 	addEventListener('keydown', (e) => handleKeydown(e.key));
	// 	return removeEventListener('keydown', (e) => handleKeydown(e.key));
	// }, [output]);

	const handleCopynClean = () => {
		navigator.clipboard.writeText(output);
		setOutput('');
	}

	useEffect(() => {
		setToPick(getChars(input.slice(0, 2)));
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
			<div className={styles.wholeList}>
				{maxPage! > 0 && <div className={styles.arrows} onClick={nextPage}>&larr;</div>}
				{toPick.charArray.map((list: string[], page: number) => {
					return (
						<div className={`${styles.singleList} ${page === currPage && styles.currentSelection}`} key={page}>
							{list.map((char: string, selectKey: number) => {
								if (selectKey === 9) selectKey = 0;
								else selectKey = selectKey + 1;
								return (
									<div key={selectKey} className={styles.key} onClick={() => handleOutput(char)}>
										<span>{char}</span> <span>{selectKey}</span>
									</div>
								);
							})}
							{currPage! + 1 + '/' + (toPick.pages + 1)}
						</div>
					);
				})}
				{maxPage! > 0 && <div className={styles.arrows} onClick={prevPage}>&rarr;</div>}
			</div>
		);
	};

	return (
		<div className='container mx-auto text-center'>
			<Head>
				<title>速成輸入法</title>
				<meta name='description' content='Simple Input' />
			</Head>
			<textarea className={styles.outputTextarea} value={output} onChange={(e) => setOutput(e.target.value)} style={{ resize: 'none' }} /> <br/>
			<input autoFocus type='text' ref={inputRef} className='border border-black rounded my-3 w-16' style={{boxShadow:'0 0 5px grey'}} value={input} onChange={(e) => handleInput(e.target.value)} />
			<button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-full' onClick={() => handleCopynClean()}>Copy to clipboard and clean up</button>
			{toPick && pickingList(toPick)}
		</div>
	);
};

export default SimpleInputPage;
