import { FaSearch, FaBell, FaCog } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search here"
          className="border-none focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-500 cursor-pointer" />
        <FaCog className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
