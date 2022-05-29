import moment from "moment";


/**
 * Dar formato de tipo fecha (Date) para que lo reciba la librería de calendar en su
 * propiedad de atributos.
 */
export const prepareEvents = ( events = [] ) => {
    return events.map( (element) => ({
        ...element,
        end:    moment( element.end ).toDate(),
        start:  moment( element.start ).toDate()
    }));
}