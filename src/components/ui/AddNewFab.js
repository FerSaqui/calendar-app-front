import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleButtonOpenModal = () => {
    dispatch( uiOpenModal() );
  }

  return (
    <button
        onClick={ handleButtonOpenModal }
        className="btn btn-primary fab"
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
