import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../configs/api";
import { toastify } from "../../components/base/toastify";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await API.get(`/auth/verify/${token}`);
        if (response?.status === 201) {
          toastify("success", response?.data?.message);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [token]);
  return (
    <div>
      <h1></h1>
    </div>
  );
}
