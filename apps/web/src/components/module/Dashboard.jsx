import { useParams } from "react-router-dom";

export const Dashboard = ({ children }) => {
  const { path } = useParams();
  return (
    <main className=" bg-gray-200 h-screen lg:h-full w-full lg:w-[1200px] flex justify-center lg:py-5">
      <div
        className={`${
          path != "addproduct"
            ? "bg-white lg:w-[80%] w-full h-screen lg:h-[600px] rounded-md px-10 py-5 lg:border border-gray-400 "
            : "bg-gray-200 h-[1600px]"
        }`}
      >
        {children}
      </div>
    </main>
  );
};
