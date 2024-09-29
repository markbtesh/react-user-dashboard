"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const TextEditor = dynamic(() => import('../../../components/CollaborativeEditor'), { ssr: false });

const DocumentEditor = () => {
  const { id } = useParams(); // Fetch the dynamic route ID
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // Fetch the document data based on the ID
    if (id) {
      async function fetchDocument() {
        try {
          const res = await fetch(`/api/documents/${id}`);
          const data = await res.json();
          setDocument(data);
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
      fetchDocument();
    }
  }, [id]);

  // Fix for layout and return structure
  if (!document) {
    return (
      <Layout>
        <h2 className='text-center m-50'>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-5">{document.title}</h1>
        <TextEditor initialContent={document.content} docId={id} collab={document.collab}/>
      </div>
    </Layout>
  );
};

export default DocumentEditor;
