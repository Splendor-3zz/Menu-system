import HomePage from "@/components/HomePage";
import { getCategoriesAction } from "../../action/action";
import Header from "@/components/Header";

export default async function Home() {  
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}
