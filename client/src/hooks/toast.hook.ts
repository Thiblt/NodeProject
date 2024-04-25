import { toast } from "react-toastify";

const useToast = (msg: string, type: "success" | "error") => {
  toast(msg, {
    type: type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export default useToast;
