export const Dashboard = ({ children }) => {
  return (
    <main className="bg-gray-200 h-screen w-full lg:w-[1340px] flex justify-center lg:py-10">
      <div className="bg-white lg:w-[80%] w-[600px] h-screen lg:h-[600px] rounded-md px-10 py-5 lg:border border-gray-400 ">
        {children}
      </div>
    </main>
  );
};
