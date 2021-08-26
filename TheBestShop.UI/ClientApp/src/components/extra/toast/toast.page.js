import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../redux/actions/general/generalActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastPage = () => {
  const toastMessage = useSelector((state) => state.generalReducer.toastMessage);
  const toastMessageType = useSelector((state) => state.generalReducer.toastMessageType);

  const dispatch = useDispatch();

  const getToast = () => {
    switch (toastMessageType) {
      case "success":
        toast.success(toastMessage);
        break;
      case "info":
        toast.info(toastMessage);
        break;
      case "danger":
        toast.error(toastMessage);
        break;
      case "warning":
        toast.warning(toastMessage);
        break;
      default:
        toast.info(toastMessage);
        break;
    }
  };

  useEffect(() => {
    toastMessage !== "/" && toastMessage !== "" && getToast();
    dispatch(setToast("/"));
  }, [toastMessage]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      limit={3}
      pauseOnHover={false}
    />
  );
};