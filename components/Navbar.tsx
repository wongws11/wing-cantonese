import Link from 'next/link';

export const Navbar = () => {
	return (
		<nav className='flex items-center flex-wrap bg-gray-900 p-2'>
			<Link className='inline-flex items-center p-2 mr-4' href='/'>
				<span className='text-xl text-white font-bold uppercase tracking-wide'>W</span>
			</Link>
			<Link className='inline-flex items-center p-2 mr-4' href='/faancit'>
				<span className='text-xl text-white font-bold uppercase tracking-wide'>反切</span>
			</Link>
			<Link className='inline-flex items-center p-2 mr-4' href='/simpleinput'>
				<span className='text-xl text-white font-bold uppercase tracking-wide'>速成</span>
			</Link>
		</nav>
	);
};
