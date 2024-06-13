import { useEffect, useState } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);
  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = `${import.meta.env.VITE_MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log("result", result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log("result", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };
  return { snapEmbed };
};
export default useSnap;
