import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context'

const Toast = () => {
    const { state, setState } = useContext(MyContext);
    const toast = state.toast;
    const [show, setShow] = useState(toast.text ? true : false);
    const [backup, setBackup] = useState(toast.text);

    const clearToast = () => setState((prevState) => ({ ...prevState, toast: {"text": null, success:toast.success} }) );

    useEffect(() => {
        if(toast.text) {
            setBackup(toast.text);
            setShow(true);
            const timeout = setTimeout(() => {
                setShow(false);
                setTimeout(() => clearToast(), 500);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [toast.text]);
    return (
    <div onClick={() => {setShow(false); setTimeout(() => setBackup(""), 500)}} className={`px-3 py-1 rounded-md border-t-[3px] shadow-md shadow-[#4444] transition-all duration-500 flex gap-2 items-center p-2
        ${toast.success?'border-[var(--blue)]':'border-red-500'} bg-[var(--bg)] text-[var(--text)] fixed max-sm:top-4 right-4 sm:bottom-4 z-[103] 
        ${show ? 'translate-y-[0]':'max-sm:translate-y-[-8rem] sm:translate-y-[8rem]'}`}>
        <h4>{backup}</h4>
    </div>
  )
}

export default Toast