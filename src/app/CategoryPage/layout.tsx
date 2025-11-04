import Header from "@/components/Header";

interface IProps {
    children: React.ReactNode;
}

const layout = ({children}: IProps) => {
    return(
        <div>
            <Header/>
            {children}
        </div>
    )
}

export default layout