import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";

import "moment/locale/es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { prepareEvents } from "../../helpers/prepareEvents";
import { prepareEventToStore } from "../../helpers/prepareEventToStore";
import { DeleteEventFab } from "../ui/DeleteEventFab";
moment.locale("es");

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const events = [
//   {
//     title: "Cumpleaños",
//     start: moment().toDate(), //start es la fecha inicial del evento (Se toma la fecha actual)
//     end: moment().add(2, "hours").toDate(), //Fecha final del evento (La fecha actual más dos horas)
//     bgcolor: "#00000",
//     user: {
//       _id: "123",
//       name: "Fernando"
//     }
//   },
// ];

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem("lastView") || "month" );
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );
  const eventsUser = prepareEvents( events );

  /**Evento de doble click sobre el evento */
  const handleDoubleClick = (event) => {
    dispatch( uiOpenModal() );
  }

  /**Evento de un solo click al evento. */
  const onSelectEvent = (event) => {
    
    dispatch( eventSetActive( prepareEventToStore( event ) ));
  }

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  }

  //Método para evento de click afuera de evento seleccionado
  const onSelectSlot = (event) => {
    dispatch( eventClearActiveEvent() );
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white"
    }

    return {
        style
    };
  }

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        formats
        events={ eventsUser }
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter = { eventStyleGetter }
        onDoubleClickEvent =  { handleDoubleClick }
        onSelectEvent = { onSelectEvent }
        onView = { onViewChange }
        view = { lastView }
        components = {{
          event: CalendarEvent
        }}
        onSelectSlot = { onSelectSlot } //Para click afuera del evento seleccionado
        selectable = { true } //Para click afuera del evento seleccionado
      />

      <CalendarModal />
      <AddNewFab />

      {
        ( activeEvent )
            &&
        <DeleteEventFab />
      }

    </div>
  );
};
