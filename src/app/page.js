import Layout from '../components/Layout';
import DashboardCards from '../components/DashboardCards';
import LineChart from '../components/LineChart';
import TaskManager from '../components/TaskManager';
import TechNewsFeed from '@/components/NewsFeed';


const Dashboard = () => {
  return (
    <Layout>
      
      <div className="p-4">
          <DashboardCards />
    <h1>{process.env.DATABASE_URL}</h1>
        </div>

        <div className="p-4 grid grid-cols-2">
        <LineChart />
        <div className='max-h-24'>
        <h2 className="text-2xl font-bold ml-6 mb-4">What's New</h2>
        <TechNewsFeed cards={2} columns={2}/>
        </div>
        </div>

        <TaskManager/>
       
    </Layout>
  );
};

export default Dashboard;
