
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_popup(mensaje,icono,foc){
    const mySaw=withReactContent(Swal);
    mySaw.fire(
        {
            title:mensaje,
            icono:icono
        }
    );
}

function onfocus(foco){
    if(foco!=''){
        document.getElementById(foco).focus();
    }
}