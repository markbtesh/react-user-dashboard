"use client"; // Ensure client-side rendering

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/week views
import timeGridPlugin from "@fullcalendar/timegrid"; // For time-based events
import interactionPlugin from "@fullcalendar/interaction"; // For drag and drop
import { useState, useEffect } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Define fetchEvents outside of useEffect, so it can be reused.
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, []);

  const handleDateSelect = async (selectInfo) => {
    let title = prompt("Enter the title for your event:");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Unselect the date on the calendar
  
    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr, // Start date from selection
        end: selectInfo.endStr,     // End date from selection
        allDay: selectInfo.allDay,  // Is it an all-day event?
      };
  
      // POST request to save the event in the database
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
  
        if (!response.ok) {
          throw new Error("Failed to save the event.");
        }
  
        const savedEvent = await response.json();
  
        // Add the new event to the local state
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: savedEvent.id, // Ensure that the event ID comes from the backend
            title: savedEvent.title,
            start: savedEvent.start, // Make sure this is correctly formatted
            end: savedEvent.end,     // Handle end time if provided
            allDay: savedEvent.allDay,
          },
        ]);
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };
  

  const handleEventClick = async (clickInfo) => {
    if (
      window.confirm(`Do you want to delete the event '${clickInfo.event.title}'?`)
    ) {
      // DELETE request to remove the event from the database
      try {
        await fetch(`/api/events/${clickInfo.event.id}`, {
            method: "DELETE",
          });

          fetchEvents();
        // Remove the event from the state
        setEvents(events.filter((event) => event.id !== clickInfo.event.id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };


  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl text-white mb-5">
  <h1 className="text-4xl font-bold mb-5">Interactive Calendar</h1>

</div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth" // Default view
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect} // To handle adding events
        events={events} // State-based events
        eventClick={handleEventClick} // To handle event clicks
        height="auto"
      />
     
    </div>
  );
};

export default Calendar;
