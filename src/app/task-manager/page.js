import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';


// Dynamically import the TaskManager with SSR disabled
const TaskManager = dynamic(() => import('../../components/TaskManager'), { ssr: false });

const TaskManagerPage = () => {
  return (
    <Layout>
      <TaskManager />
    </Layout>
  );
};

export default TaskManagerPage;