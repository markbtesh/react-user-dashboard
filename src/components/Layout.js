import Sidebar from './Sidebar';
import TopBar from './TopBar'
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 w-6/8 ml-72 overflow-x-hidden">
        <TopBar />
  
        {children}

      </div>
    </div>
  );
};

export default Layout;
