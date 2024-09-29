import Layout from "../../components/Layout";
import Calendar from "../../components/Calendar"; // Import the Calendar component

const CalendarPage = () => {
  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-4xl font-semibold mb-8">My Meetings and Events</h2>
        <Calendar />
      </div>
      
    </Layout>
  );
};

export default CalendarPage;
