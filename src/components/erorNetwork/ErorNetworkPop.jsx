import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErorNetworkPop() {
    const ErorMsg = useCallback(() => {
      toast.error('Eror Something Went Wrong ', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    },[])

  return {
    ErorMsg
  }
}
