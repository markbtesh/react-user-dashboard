"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'list', 'bullet', 'align'
];

const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean']
  ]
};

const CollaborativeEditor = ({ initialContent, docId, collab }) => {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(!initialContent);

  // Fetch document when the component mounts
  useEffect(() => {
    if (!initialContent && docId) {
      async function fetchDocument() {
        try {
          const response = await fetch(`/api/documents/${docId}`);
          if (response.ok) {
            const data = await response.json();
            setContent(data.content);
            setIsLoading(false);

            collabWith = data.collab;
          } else {
            console.error('Failed to fetch document', response.status);
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
      fetchDocument();
    }
  }, [docId, initialContent]);

  // Debounced handler for content changes
  const handleContentChange = useCallback(
    debounce(async (value) => {
      if (!docId) {
        console.error('Cannot save document. docId is undefined.');
        return;
      }
      
      setContent(value);
      try {
        await fetch(`/api/documents/${docId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: value }),
        });
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }, 1000), 
    [docId]
  );

  if (isLoading) {
    return <p>Loading document...</p>;
  }

  return (
    <div className="p-8 min-h-screen">
    <div className='justify-between flex'> <h2 className="text-2xl font-bold mb-4">Editing Document</h2>
      <p className='text-gray-400'>Collaborating with {collab}</p></div> 
      <QuillNoSSRWrapper
        value={content}
        onChange={handleContentChange}
        formats={formats}
        modules={modules}
        theme="snow"
        className="my-custom-quill-editor"
      />
    </div>
  );
};

// Utility function to debounce rapid function calls
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default CollaborativeEditor;
