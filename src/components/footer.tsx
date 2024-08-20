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
            <p>
              Stay Up to Date with the latest news and insights from out blog.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
