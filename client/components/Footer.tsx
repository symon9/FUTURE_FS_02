const Footer = () => {
  return (
    <footer className="bg-brand-teal text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">ShopVerse</h3>
          <p className="text-brand-amber font-medium text-lg">
            Your World of Smart Shopping
          </p>
          <p className="text-slate-300 mt-4 text-sm">
            &copy; {new Date().getFullYear()} ShopVerse. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
