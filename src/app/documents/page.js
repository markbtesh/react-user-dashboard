"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

function App() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch list of documents from the server
    async function fetchDocuments() {
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);

      if (data === null) {
        return <div><p className="text-center text-xl mt-20">Loading documents... </p> <Loader color={'white'}/></div>;
      }
    }
    fetchDocuments();

    
  }, []);

 

  return (
    <Layout>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Collaborative Project Editor</h1>
      
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-8 min-h-screen rounded-lg">
      <div className='justify-between flex mt-4'><h1 className="text-3xl font-bold mb-4  ">Select a Document</h1>
      <button className='rounded-full bg-gray-600 text-white text-4xl px-5 py-2 mr-4 hover:scale-105 transition ease-in-out'>+</button></div>

      {documents.length == 0 ? (
           <div><p className="text-center text-xl mt-20 mb-5">Loading documents... </p> <Loader /></div>
        ) :  <div className='justify-end text-gray-400 flex mb-4 mt-10 px-4'>
        <FontAwesomeIcon icon={faUserGroup}  className="mr-10 ml-2 text-center w-1/2 text-gray-600"/>  <p>last updated</p></div>
     }
        
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-gray-600">
            
            <Link href={`/text-editor/${doc.id}`} className='flex justify-between items-center'>
  {/* Left - Title and Icon */}
  <div className='flex items-center w-[95%]'>
    <FontAwesomeIcon icon={faFile} size='2x' className="mr-8" />
    <span className='font-bold'>{doc.title}</span>
  </div>

  {/* Center - Name */}
  <div className='text-left w-1/4 text-gray-300'>
    <p>{doc.collab}</p>
  </div>

  {/* Right - Date */}
  <div className='text-right w-1/3 text-gray-400'>
    <p>{new Date(doc.updatedAt).toLocaleDateString()}</p>
  </div>
</Link>

          </li>
        ))}
      </ul>
    </div>
    </div>
    </Layout>
  );
}

export default App;
