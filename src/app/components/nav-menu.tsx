'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavMenu() {
    const pathname = usePathname();

    const linkClasses = (path: string) =>
        `px-3 py-2 rounded transition-colors ${
            pathname === path
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`;

    return (
        <nav className="flex gap-4 mb-6 border-b border-gray-700 pb-3">
            <Link href="/" className={linkClasses('/')}>
                Home
            </Link>
            <Link href="/neighbors" className={linkClasses('/neighbors')}>
                Add neighbor
            </Link>
        </nav>
    );
}
