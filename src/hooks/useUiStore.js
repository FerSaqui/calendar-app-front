/**Me sirve para hacer el dispatch de acciones del ui contenida en la store*/

import { useSelector, useDispatch } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {
        //Properties
        isDateModalOpen,

        //Métodos
        openDateModal,
        closeDateModal
    }
}