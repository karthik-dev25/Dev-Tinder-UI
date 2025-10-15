import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../store/toastSlice";

const ToastMessage = () => {
  const dispatch = useDispatch();
  const toast = useSelector((store) => store.toast);
  useEffect(() => {
    const timer = setTimeout(() => dispatch(hideToast()), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, toast]);
  return (
    <div>
      <div className="toast toast-top toast-center">
        {toast?.type === "success" && (
          <div className="alert alert-success">
            <span>{toast?.message}</span>
          </div>
        )}
        {toast?.type === "error" && (
          <div className="alert alert-error">
            <span>{toast?.message}</span>
          </div>
        )}
        {toast?.type === "info" && (
          <div className="alert alert-info">
            <span>{toast?.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastMessage;
