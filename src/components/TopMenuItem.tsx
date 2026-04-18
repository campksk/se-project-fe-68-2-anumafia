import Link from 'next/link';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
  return (
    <Link 
      href={pageRef} 
      className="font-semibold text-gray-700 hover:text-cyan-600 transition-colors"
    >
      {title}
    </Link>
  );
}