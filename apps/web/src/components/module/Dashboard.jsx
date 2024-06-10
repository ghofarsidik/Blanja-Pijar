export const Dashboard = ({ children }) => {
  return (
    <main className="bg-gray-200 h-screen w-full flex justify-center py-10">
      <div className="bg-white w-[80%] h-[600px] rounded-md px-10 py-5 border border-gray-400 ">{children}</div>
    </main>
  );
};
