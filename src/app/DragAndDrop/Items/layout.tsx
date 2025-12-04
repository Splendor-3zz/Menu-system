import Header from "@/components/Header";
import { NavigationMenuDemoTwo } from "@/components/header/NavigationMenuTwo";

interface IProps {
    children: React.ReactNode;
}

const layout = ({children}: IProps) => {
    return(
        <div>
            <NavigationMenuDemoTwo/>
            {children}
        </div>
    )
}

export default layout