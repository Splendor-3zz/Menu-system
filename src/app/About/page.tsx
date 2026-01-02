interface IProps {}

const page = ({}: IProps) => {
  return (

      <div className="flex flex-col justify-center content-center items-center border-2 border-indigo-500 border-t-indigo-300 rounded py-12 mx-5 shadow-lg shadow-blue-950 shado">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <div className="flex justify-between w-200 mt-10 space-x-20">
          <h1 className="text-2xl font-bold">Name :</h1>
          <h1 className="text-2xl font-bold">EZZALDEEN AL-SHAIBANI</h1>
        </div>
        <div className="flex justify-between w-200 mt-10 space-x-20">
          <h1 className="text-2xl font-bold">Phone :</h1>
          <h1 className="text-2xl font-bold">+90 501 357 55 67</h1>
        </div>
        <div className="flex justify-between w-200 mt-10 space-x-20">
          <h1 className="text-2xl font-bold">Email :</h1>
          <h1 className="text-2xl font-bold">ezzaldeen.alshaibani@gmail.com</h1>
        </div>
      </div>
  );
};

export default page;
