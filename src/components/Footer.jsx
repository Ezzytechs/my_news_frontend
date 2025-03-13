const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 w-full overflow-hidden">
      <div className="mt-6 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} My News. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
