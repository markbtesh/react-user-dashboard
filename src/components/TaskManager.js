"use client"; // Ensures this file is a Client Component, as hooks like `useState` and `useEffect` require it

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpRegular, faComment } from '@fortawesome/free-regular-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TaskManager = () => {

  
  const pathname = usePathname(); 

  // Define the state `tasks` that holds the columns (To Do, In Progress, Done) and tasks within them
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
// Create a ref for the textarea

  // Update task logic
  const textareaRefs = useRef({});

  // Update task logic
  const handleTaskEdit = async (columnKey, taskId, newText) => {
    setTasks((prevTasks) => ({
      ...prevTasks, // Spread the previous task object
      [columnKey]: prevTasks[columnKey].map((task) => {
        // Return a new object for the task being edited
        if (task.id === taskId) {
          return { ...task, text: newText }; // Modify the text of the target task
        }
        return task; // Return other tasks unchanged
      }),
    }));
  };

  // Handle losing focus on textarea (for deleting if empty or saving the task)
  const handleBlur = async (columnKey, taskId, taskText) => {
    if (taskText.trim() === '') {
      try {
        // DELETE task if the newText is empty
        await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        fetchTasks();
        console.log('Task deleted successfully');
      } catch (error) {
        console.error('Failed to delete task in the database', error);
      }
    } else {
      try {
        // UPDATE task in the database if not empty
        await fetch(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: taskText }),
        });
        console.log('Task updated successfully');
      } catch (error) {
        console.error('Failed to update task in the database', error);
      }
    }
  };

  // Handle pressing Enter to unfocus the textarea
  const handleKeyDown = (e, taskId) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent creating a new line
      if (textareaRefs.current[taskId]) {
        textareaRefs.current[taskId].blur(); // Unfocus the textarea for the specific task
      }
    }
  };


  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();

      // Log the response to see its structure
      console.log("API Response Data:", data);

      // Check if data is an array
      if (Array.isArray(data)) {
        const todoTasks = data.filter(task => task.status === 'todo');
        const inProgressTasks = data.filter(task => task.status === 'inProgress');
        const doneTasks = data.filter(task => task.status === 'done');

        setTasks({
          todo: todoTasks,
          inProgress: inProgressTasks,
          done: doneTasks,
        });
      } else {
        console.error("Expected an array but received:", typeof data);
        // Handle unexpected response
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }


useEffect(() => {

  fetchTasks();
}, []);


const handleTaskNew = async (selectedColumn) => {
  const newTask = {
    id: Math.random().toString(36).substring(2, 9), 
    text: 'New Task',
    author: 'me', // Replace with actual author logic
    status: selectedColumn,
  };

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  const data = await res.json();

  setTasks((prev) => ({
    ...prev,
    [selectedColumn]: [...prev[selectedColumn], data],
  }));
};




  const handleOnDragEnd = async (result) => {
  const { source, destination } = result;

  // If no destination (dropped outside), return
  if (!destination) return;

  const startCol = source.droppableId;
  const endCol = destination.droppableId;

  // If moved within the same column
  if (startCol === endCol) {
    const updatedTasks = Array.from(tasks[startCol]);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [startCol]: updatedTasks,
    }));

    // Update task order in the database for tasks in the same column
    await updateTaskOrderInDatabase(updatedTasks, startCol);

  } else {
    // If moved to a different column
    const startTasks = Array.from(tasks[startCol]);
    const [movedTask] = startTasks.splice(source.index, 1);
    const endTasks = Array.from(tasks[endCol]);
    endTasks.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [startCol]: startTasks,
      [endCol]: endTasks,
    }));

    // Update task order in the database for both columns (start and end)
    await updateTaskOrderInDatabase(startTasks, startCol);
    await updateTaskOrderInDatabase(endTasks, endCol);

    // Update the task's status (column) in the database
  //  await updateTaskStatusInDatabase(movedTask.id, endCol);
  }
};

// Function to update task order in the database
const updateTaskOrderInDatabase = async (updatedTasks, columnKey) => {
  try {
    await Promise.all(
      updatedTasks.map((task, index) =>
        fetch(`/api/tasks/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: index, status: columnKey }),
        })
      )
    );
  } catch (error) {
    console.error("Failed to update task order in the database", error);
  }
};

// Function to update task's status


  const handleLikedTask = (columnKey, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnKey]: prevTasks[columnKey].map((task) =>
        task.id === taskId ? { ...task, liked: !task.liked } : task
      ),
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Task Manager</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(tasks).map((columnKey) => (
            <Droppable key={columnKey} droppableId={columnKey}>
              {(provided) => (
                <div className="max-h-[500px] ">
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gradient-to-br from-blue-200 to-blue-100 p-4 rounded-xl min-h-[150px] shadow-lg overflow-y-auto"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    {columnKey === 'todo' ? 'To Do' : columnKey === 'inProgress' ? 'In Progress' : 'Done'}
                  </h2>


                
                  {tasks[columnKey].length === 0 ? (
                     <p className="text-gray-500 text-center">No tasks</p>
                      ) : (
                      tasks[columnKey].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 mb-3 rounded-lg shadow hover:shadow-md transition-all"
                        >
                          <textarea
                              value={task.text}
                               placeholder="New Task..."
                              onChange={(e) => handleTaskEdit(columnKey, task.id, e.target.value)}
                              className="border-none bg-transparent resize-none overflow-hidden w-2/4 block focus:underline focus:border-white focus:ring-2 focus:ring-white outline-none"
                              onBlur={() => handleBlur(columnKey, task.id, task.text)} // Call handleBlur on losing focus
                             onKeyDown={(e) => handleKeyDown(e, task.id)}
                              style={{
                                height: 'auto',
                                minHeight: '50px', 
                              }}
                              rows={1} // Start with one row
                              onInput={(e) => {
                                // Dynamically adjust the height of the textarea
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                              }}
                            />

                            <div className='flex justify-between'>

                            <div className="flex space-x-2 items-center">
                            <label>
                              <input
                              type="checkbox"
                              checked={task.liked}
                              onChange={() => handleLikedTask(columnKey, task.id)}
                              className='items-left opacity-0 absolute'>
                                
                              </input>
                              {task.liked ? (
                                 <FontAwesomeIcon icon={faThumbsUp}  style={{ fontSize: '1.1rem', color: 'navy' }} className="cursor-pointer"/>
                                ) : (
                                  <FontAwesomeIcon icon={faThumbsUpRegular} style={{ fontSize: '1.1rem', color: 'navy'  }} className="cursor-pointer"/>
                                )}
                          </label>

                          <button className="pl-3">
                          <FontAwesomeIcon icon={faComment} className="pr-1"/>
                            <label>
                              {task.comments}
                            </label>
                          </button>
                        </div>
                          { pathname === '/task-manager' ? ( 
                              <p className='text-right text-gray-400 text-sm'>posted by {task.author} </p>
                          ) : null }
                          </div>
                        </div>
                        
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}

                { pathname === '/task-manager' ? (
                <button onClick={() => handleTaskNew(columnKey)}>
        + New Task
      </button>
      ) : null}
                </div>
                </div>
              )}
            </Droppable>
         ))}

         
        </div>
        
      </DragDropContext>

    
    </div>
  );
};


export default TaskManager;
