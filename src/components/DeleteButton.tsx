'use client';

import { Button } from "./ui/button";

interface IProps {

}

const DeleteButton = ({}: IProps) => {

    const handleButton = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();       // stop the link navigation
        e.stopPropagation();      // stop click bubbling
        // your edit logic here...
      };

    return(
        <Button className="my-5 cursor-pointer bg-red-500 hover:bg-red-400 w-20" onClick={handleButton}>Delete</Button>
    )
}

export default DeleteButton