import Link from 'next/link';

export const Navbar = () => {
	return (
		<>
			<nav className='flex items-center flex-wrap bg-gray-900 p-3 '>
				<Link className='inline-flex items-center p-2 mr-4' href='/'>
					<span className='text-xl text-white font-bold uppercase tracking-wide'>Wing&apos;s Cantonese</span>
				</Link>
				<Link className='inline-flex items-center p-2 mr-4' href='/faancit'>
					<span className='text-xl text-white font-bold uppercase tracking-wide'>反切</span>
				</Link>
			</nav>
		</>
	);
};
