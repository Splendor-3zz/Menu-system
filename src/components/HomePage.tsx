import Image from "next/image";
import { Button } from "./ui/button";

interface IProps {}

const Home = ({}: IProps) => {
  return (
    <div className="flex m-auto justify-center items-center mt-20 container">
      <div>
        <h1 className="font-bold text-4xl ">Delicious & Affordable</h1>
        <h1 className="font-bold text-4xl text-white bg-indigo-600 w-fit m-3 px-3 py-2 bg-accent-foreground">
          Meals Near You.
        </h1>
        <h6 className="w-120 my-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h6>
        <Button className="bg-indigo-500 cursor-pointer text-white px-10 m-3 hover:bg-indigo-300">
          order now
        </Button>
      </div>
      <div>
        <Image
          className=""
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
