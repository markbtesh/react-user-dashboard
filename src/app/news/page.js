import Layout from '@/components/Layout';
import TechNewsFeed from '@/components/NewsFeed';


const Dashboard = () => {
  return (
    <Layout>
      <div className='my-8'>
        <h1 className="text-3xl font-bold ml-6 mb-4">What's New</h1>
        <TechNewsFeed cards={12} columns={3}/>
        </div>
    </Layout>
  );
};

export default Dashboard;
