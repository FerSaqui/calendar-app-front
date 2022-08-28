import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const [lasView, setLasView] = useState(localStorage.getItem("lastView") || "week");

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white"
    }
    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem("lastView", event);
    console.log({ viewChanged: event });
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={ lasView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
