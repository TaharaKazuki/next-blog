import { Icons } from './icons';

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
                <Icons.X className="size-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </a>

              <a
                href="https://github.com/TaharaKazuki"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Icons.gitHub className="size-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
