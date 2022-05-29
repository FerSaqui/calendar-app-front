import moment from 'moment'
import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: "Cumpleaños",
        start: moment(moment().toDate()).format(), //start es la fecha inicial del evento (Se toma la fecha actual)
        end: moment(moment().add(2, "hours").toDate()).format(), //Fecha final del evento (La fecha actual más dos horas)
        notes: "Prueba estático evento",
        bgcolor: "#00000",
        user: {
           _id: "123",
            name: "Fernando"
        }
    }],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventClearActiveEvent: 
            return {
                ...state,
                activeEvent : null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    event => ( event.id === action.payload.id ) ? action.payload : event
                )
            };

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => ( event.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }

        default:
            return state;
    }

}