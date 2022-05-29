import React, { useEffect, useState } from "react";

import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from "../../actions/events";
import { prepareEventToStore } from "../../helpers/prepareEventToStore";
import { prepareEvents } from "../../helpers/prepareEvents";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const dateOne = moment().minutes(0).seconds(0).add(1, "hours");
const dateTwo = dateOne.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: dateOne.toDate(),
  end: dateTwo.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(dateOne.toDate());
  const [dateEnd, setDateEnd] = useState(dateTwo.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(prepareEvents([activeEvent])[0]);
    }else{
      setFormValues( initEvent );
    }
  }, [activeEvent, setFormValues]);

  const handleInputchange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value, //Se llama propiedad computada
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (event) => {
    setDateStart(event);
    setFormValues({
      ...formValues,
      start: event,
    });
  };

  const handleEndDateChange = (event) => {
    setDateEnd(event);
    setFormValues({
      ...formValues,
      end: event,
    });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    //TODO: Realizar grabación
    if (activeEvent) {
      const eventToStoreUpdated = prepareEventToStore(formValues);
      dispatch( eventUpdated({...eventToStoreUpdated}) );
    } else {
      const eventToStore = prepareEventToStore(formValues);
      dispatch(
        eventAddNew({
          ...eventToStore,
          id: new Date().getTime(),
          user: {
            _id: "1234",
            name: "Fernando",
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {( activeEvent ) ? "Editar evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm} noValidate>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            className="form-control"
            format="y-MM-dd h:mm:ss a"
            amPmAriaLabel="Select AM/PM"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            minDate={start}
            className="form-control"
            format="y-MM-dd h:mm:ss a"
            amPmAriaLabel="Select AM/PM"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputchange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputchange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary w-100">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
