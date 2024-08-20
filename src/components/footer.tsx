import Link from 'next/link';

import { Icons } from './icons';
import { POSTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const Footer = () => {
  const links = [
    { href: 'mailto:w3tsadev@gmail.com', label: 'Contact', external: true },
    { href: '/terms-of-services', label: 'Terms of Services' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/sitemap.xml', label: 'Sitemap' },
  ];

  const linkClassName =
    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';

  return (
    <footer className="mt-10 bg-gray-100 py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* grid 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icons.logo className="size-6" />
              <span className="text-base font-semibold">Coding</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay Up to Date with the latest news and insights from out blog.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <Icons.X className={cn(linkClassName, 'size-6')} />
              </a>

              <a
                href="https://github.com/TaharaKazuki"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Icons.gitHub className={cn(linkClassName, 'size-6')} />{' '}
              </a>
            </div>
          </div>

          {/* grid 2 */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Blog</h3>
            <ul className="space-y-2 text-sm">
              {POSTS.map((post) => (
                <li key={post.title}>
                  <Link href={post.href} className={linkClassName}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* grid 3 */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Links</h3>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} className={linkClassName}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* grid 4 */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">NewsLetter</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subscribe to our newsletter to stay up-to-date with the latest
              news and updates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
