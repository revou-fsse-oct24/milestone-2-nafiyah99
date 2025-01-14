import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 right-0 w-full bg-zinc-800 text-white p-4 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className='text-center md:text-left'>
          <p className='text-3xl font-semibold'>ShopSmart</p>
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-2">Quick Links</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-zinc-200">
                Products
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-zinc-200">
                Resources
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-zinc-200">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-2">Social Media</h5>
          <ul>
            <li className="mb-2">
              <a href="https://github.com/nafiyah99" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200">
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                GitHub
              </a>
            </li>
            <li className="mb-2">
              <a href="https://twitter.com/nafiyah99" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200">
                <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                Twitter
              </a>
            </li>
            <li className="mb-2">
              <a href="https://linkedin.com/in/nafiyah99" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200">
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-zinc-600 mt-4 pt-4">
        <p className='text-sm'>&copy; 2025 nafiyah99</p>
      </div>
    </footer>
  );
};

export default Footer;
