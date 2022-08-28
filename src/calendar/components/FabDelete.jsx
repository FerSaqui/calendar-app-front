import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore'

export const FabDelete = () => {
    const { startDeletingEvent, hasSelectedEvent } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style = {{
          display: hasSelectedEvent ? "" : "none"
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
