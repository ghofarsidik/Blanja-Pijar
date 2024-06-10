import foto from "../../assets/images/profile/Mask Group.png";

export const Sidebar = ({ children }) => {
  return (
    <div className="bg-gray-100 w-[35%] h-screen">
      <div className="flex justify-center items-center pl-20 py-10 gap-5">
        <img src={foto} alt="" />
        <div className="flex flex-col ">
          <p className="font-bold">Johanes Mikael</p>
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
