'use client';
import { Button } from "./ui/button";

interface IProps {

}

const EditButton = ({}: IProps) => {

    const handleButton = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();       // stop the link navigation
        e.stopPropagation();      // stop click bubbling
        // your edit logic here...
      };

    return(
        <Button className="my-5 cursor-pointer bg-blue-400 hover:bg-blue-300 w-20" onClick={handleButton}>edit</Button>
    )
}

export default EditButton