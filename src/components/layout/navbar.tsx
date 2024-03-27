import type { FunctionComponent } from "../../common/types";

export const Navbar = (): FunctionComponent => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo and app name */}
            <div>
              <a href="/" className="flex items-center py-2 px-3 text-white hover:text-gray-300">
                <span className="font-bold">Crisp</span>
              </a>
            </div>
          </div>

          {/* Buttons on the right */}
          <div className="flex items-center space-x-1">
            <a href="#" className="py-2 px-3 hover:bg-gray-700 rounded">Home</a>
            <a href="#" className="py-2 px-3 hover:bg-gray-700 rounded">About</a>
            <a href="#" className="py-2 px-3 hover:bg-gray-700 rounded">Services</a>
            <a href="#" className="py-2 px-3 hover:bg-gray-700 rounded">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};