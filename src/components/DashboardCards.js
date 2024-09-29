import { FaHome, FaUsers, FaDollarSign, FaChartLine } from 'react-icons/fa';

const DashboardCards = () => {
  const cards = [
    { icon: <FaHome />, label: 'Bookings', value: '281', change: '+55%', subtext: 'than last week', iconBg: 'bg-gradient-to-b from-gray-700 to-black' },
    { icon: <FaUsers />, label: "Today's Users", value: '2,300', change: '+3%', subtext: 'than last month', iconBg: 'bg-gradient-to-b from-blue-400 to-blue-600' },
    { icon: <FaDollarSign />, label: 'Revenue', value: '34k', change: '+1%', subtext: 'than yesterday', iconBg: 'bg-gradient-to-b from-green-400 to-green-600' },
    { icon: <FaChartLine />, label: 'Followers', value: '+91', change: '', subtext: 'Just updated', iconBg: 'bg-gradient-to-b from-pink-400 to-pink-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-10">
      {cards.map((card, idx) => (
        <div key={idx} className="relative bg-white p-4 rounded-xl shadow-lg">
          {/* Floating Icon */}
          <div className={`absolute -top-6 left-4 p-6 rounded-xl ${card.iconBg} text-white shadow-lg text-2xl`}>
            {card.icon}
          </div>

          {/* Card content */}
          <div className="text-right">
            <h3 className="text-gray-600 text-sm font-medium">{card.label}</h3>
            <h2 className="text-2xl font-bold text-gray-800">{card.value}</h2>
            </div>
            {/* Divider */}
            <div className="border-b-2 my-4 border-background"></div>

            {/* Subtext */}
            <p className={`text-sm font-bold ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {card.change} <span className="text-gray-500 font-thin">{card.subtext}</span>
            </p>
         
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
