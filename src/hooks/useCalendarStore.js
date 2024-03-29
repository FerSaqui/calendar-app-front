/** Es el encargado de cualquier interacción con mi store
 * 
 * Los demás componentes componentes solo harán uso de las funciones 
 * o propiedades que exporte este custom hooks
 */

import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        try {
            if ( calendarEvent.id ) {
                //Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({...calendarEvent, user }) );
                return;
            }
            //Creando
            const { data } = await calendarApi.post("/events", calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));            
        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", error.response.data?.msg, "error");
        }

    }

    const startDeletingEvent = async() => {
        //TODO: Legar al backend
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire("Error al eliminar", error.response.data?.msg, "error");
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );
            console.log(events);

        } catch (error) {
            console.log("Error cargando eventos");
            console.log(error);
        }
    }

    return {
        //Propiedades
        events,
        activeEvent,
        hasSelectedEvent: !!activeEvent,

        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}