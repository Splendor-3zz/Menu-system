import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface IProps {}

const Home = ({}: IProps) => {
  return (
    <div className="flex-row justify-center items-center sm:flex mx-5 mt-20">
      <div>
        <h1 className="font-bold text-2xl text-center sm:w-fit ">Delicious & Affordable</h1>
        <h1 className="font-bold text-2xl text-center text-white bg-indigo-600 sm:w-fit m-3 px-3 py-2">
          Meals Near You.
        </h1>
        <h6 className="sm:w-104 my-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h6>
        <Link className="bg-indigo-500 cursor-pointer text-white px-8 pt-1 pb-1.5 m-3 hover:bg-indigo-300 rounded" href={"/CategoryPage"}>
        order now
        </Link>
      </div>
      <div>
        <Image
          className="w-fit rounded mx-auto"
          src={"/food.avif"}
          alt="food"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Home;
