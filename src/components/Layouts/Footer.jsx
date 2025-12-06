const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-8 py-12 ">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full mx-auto">
        <div>
          <h3 className="text-white font-semibold mb-2">Game Hub - A game library</h3>
          <p className="text-sm">
            Welcome to Game Hub — your community for discovering great games,
            sharing tips, and grabbing safe, fast digital purchases. We keep
            things honest with clear pricing, prompt support, and instant
            delivery so you can get back to what matters: playing.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <a href="#">
              <li>About Us</li>
            </a>
            <a href="#">
              <li>Our Members</li>
            </a>
            <a href="#">
              <li>Contact Saled</li>
            </a>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <a href="#">
              <li>Products & Services</li>
            </a>
            <a href="#">
              <li>Customer Stories</li>
            </a>
            <a href="#">
              <li>Download Apps</li>
            </a>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Information</h4>
          <ul className="space-y-1 text-sm">
            <a href="#">
              <li>Privacy Policy</li>
            </a>
            <a href="#">
              <li>Terms & Conditions</li>
            </a>
            <a href="#">
              <li>Join Us</li>
            </a>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Social Links</h4>
          <ul className="space-y-1 text-sm">
            <a href="#">
              <li>Game Hub</li>
            </a>
            <a href="#">
              <li>Game Hub</li>
            </a>
            <a href="#">
              <li>Game Hub</li>
            </a>
            <a href="#">
              <li>support@gamehub.com</li>
            </a>
          </ul>
        </div>
      </div>
      <hr className="mt-[20px]" />
      <div className="text-left md:text-center text-gray-500 text-sm mt-8">
        © 2025 Game Hub. All rights reserved.
        <br className="block md:hidden" /> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
