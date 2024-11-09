import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { charactersAtom, socket } from '../Socketmanager';
import { ConferenceAtom } from '../Utils/ConferenceAtom';

const MenuConferenceHall = () => {
  const [characters] = useAtom(charactersAtom);
  const [_conferenceMenu, setConferenceMenu] = useAtom(ConferenceAtom);
  const [show, setShow] = useState(true);
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [events, setEvents] = useState([]); // Array to store all events

  let Me = characters.find((char) => char.id === socket.id);

  useEffect(() => {
    // Listen for updated event list from the server
    socket.on('updateEvents', (newEvents) => {
      //console.log('Received updated events:', newEvents); // Log the updated events
      setEvents(newEvents);
    });

    return () => {
      socket.off('updateEvents');
    };
  }, []);

  const handleScheduleEvent = () => {
    const newEvent = { name: eventName, time: eventTime, attendees: [] }; // Include attendees array when creating an event
    socket.emit('scheduleEvent', newEvent); // Emit the correct event name
    setEventName('');
    setEventTime('');
    setConferenceMenu(false); // Close the event creation form

  };

  const handleJoinEvent = (event) => {
    // Update the event's attendees list by adding the current character
    const updatedEvent = { ...event, attendees: [...event.attendees, Me.id] };

    // Emit the join event request to the server with the updated attendees list
    socket.emit('joinEvent', { characterId: Me.id, event: updatedEvent });
    setConferenceMenu(false);
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="absolute bottom-40 right-40 z-10 w-24 transition-all"> {/* Adjusted size */}
          {_conferenceMenu && (
            <div className="flex flex-col space-y-1"> {/* Adjusted spacing */}
              <button
                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => setConferenceMenu('schedule')}
              >
                Schedule Event
              </button>
              <button
                className="px-2 py-1 bg-transparent bg-opacity-25 outline-none border-2 border-white border-opacity-35 rounded text-white 
                text-sm font-light active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => setConferenceMenu('join')}
              >
                Join Event
              </button>
            </div>
          )}

          {_conferenceMenu === 'schedule' && (
            <div className="flex flex-col space-y-2 bg-white bg-opacity-20 p-2 rounded">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="px-2 py-1 rounded text-black text-xs"
              />
              <input
                type="datetime-local"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="px-2 py-1 rounded text-black text-xs"
              />
              <button
                onClick={handleScheduleEvent}
                className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 transition-colors duration-200"
              >
                Create Event
              </button>
            </div>
          )}

          {_conferenceMenu === 'join' && (
            <div className="flex flex-col space-y-2 bg-white bg-opacity-20 p-2 rounded max-h-40 overflow-y-auto text-xs"> {/* Adjusted height and font */}
              {events.map((event, index) => (
                <button
                  key={index}
                  onClick={() => handleJoinEvent(event)}
                  className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200 text-xs"
                >
                  {event.name} - {event.time}
                  {event.attendees.length > 0 ? ` (Attendees: ${event.attendees.length})` : ''}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MenuConferenceHall;
