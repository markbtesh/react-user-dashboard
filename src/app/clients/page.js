"use client";
import { useState } from 'react';  
import Layout from '@/components/Layout';
import { clients } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const ClientCard = ({ client, hoveredClientId, selectedClientId, setHoveredClientId, setSelectedClientId }) => {
  return (
    <div
      key={client.id}
      className="client-card p-6 rounded-lg shadow-xl bg-white/30 hover:bg-white/60 transition-all duration-500 ease-in-out relative cursor-pointer border border-gray-200"
      onMouseEnter={() => setHoveredClientId(client.id)}
      onMouseLeave={() => setHoveredClientId(null)}
      onClick={() => setSelectedClientId(client.id)}
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
          <p className="text-gray-500">{client.email}</p>
        </div>
      </div>

      {hoveredClientId === client.id && (
        <div className="absolute top-24 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg rounded-lg shadow-md transition-all duration-500 ease-in-out z-10">
          <p className="text-sm text-gray-600">Phone: {client.phoneNumber}</p>
          <p className="text-sm text-gray-600">Location: {client.location}</p>
          <p className="text-sm text-gray-600">Membership: {client.membershipStatus}</p>
          <p className="text-sm text-gray-600">Lifetime Value: ${client.lifetimeValue}</p>
          <p className="text-sm text-gray-600 pb-4">Total Orders: {client.totalOrders}</p>
          <p className="text-sm text-gray-600 pb-4">Last Order: {client.lastOrderDate}</p>

          {selectedClientId === client.id && (
          <div className="grid grid-cols-3 mt-4 gap-2">
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition duration-300">
            <FontAwesomeIcon icon={faPhone} className="mb-1" /> 
            <span>Call</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition duration-300">
            <FontAwesomeIcon icon={faEnvelope} className="mb-1" /> 
            <span>Email</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-300">
            <FontAwesomeIcon icon={faFileInvoice} className="mb-1" /> 
            <span>View Invoices</span>
          </button>
        </div>
        
          )}
        </div>
      )}
    </div>
  );
};

const ClientList = () => {
  const [hoveredClientId, setHoveredClientId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="client-list mt-8">
        <div className="flex justify-between items-center mb-6 px-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Clients</h1>
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Search clients by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {filteredClients.map(client => (
            <ClientCard
              key={client.id}
              client={client}
              hoveredClientId={hoveredClientId}
              selectedClientId={selectedClientId}
              setHoveredClientId={setHoveredClientId}
              setSelectedClientId={setSelectedClientId}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClientList;
