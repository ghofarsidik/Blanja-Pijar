import { useSelector } from "react-redux";
import defaultFoto from '../../assets/images/logo/noPhoto.png'

export const Sidebar = ({ children }) => {
  const { activeUser } = useSelector((state) => state.user);
  return (
    <div className="container bg-white w-[600px] lg:w-full lg:h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center pl-20 lg:py-10 gap-5 py-5">
        <img
          src={activeUser?.image ? activeUser?.image : defaultFoto}
          alt=""
          className="lg:h-16 lg:w-16 w-40 h-40 rounded-full"
        />
        <div className="flex flex-col items-center lg:items-start">
          <p className="font-bold text-3xl lg:text-md">{activeUser?.name}</p>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#757575"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <p className="text-gray-600">Ubah Profile</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
