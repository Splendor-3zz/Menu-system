interface IProps {

}

const Footer = ({}: IProps) => {
    return(
        <div className="flex justify-around items-center bg-indigo-600 text-white w-full text-center">
            <img className="w-10 h-10" src="/ez.png" alt="" />
            <h1>©2026 ezz copyright</h1>
        </div>
    )
}

export default Footer