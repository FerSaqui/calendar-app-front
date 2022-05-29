import moment from "moment";

export const prepareEventToStore = ( event = {} ) => {

    return {
        ...event,
        start:  moment( event.start ).format(),
        end:    moment( event.end ).format()
    }

}