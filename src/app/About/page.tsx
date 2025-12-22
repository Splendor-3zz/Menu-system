interface IProps {

}

const page = ({}: IProps) => {
    return(
        <div className="flex justify-center content-center items-center">
            <div className="w-100 bg-white text-black">
                <img src="/trash_bags.png" alt="trash" />
                <h1 className="text-6xl font-bold text-[#021f35] absolute bottom-39 left-169">ا</h1>
                <h1 className="text-4xl font-bold text-[#021f35] absolute bottom-29 left-168 z-2">جالون</h1>
                <div className="text-4xl font-bold bg-[#e4b921] w-20 rounded-2xl h-10 text-[#021f35] absolute bottom-27 left-169 z-1"></div>
                 <h1 className="text-2xl font-semibold text-[#021f35] absolute -bottom-11.5 left-138 z-2">اقتصادي</h1>
                <div className="bg-[#fef5e6] w-33 rounded-2xl h-10 text-[#021f35] absolute -bottom-11 left-135 z-1"></div>
                <h1 className="text-2xl font-semibold text-[#021f35] absolute -bottom-12 left-182 z-2">سميك</h1>
                <div className="bg-[#fef5e6] w-20 rounded-2xl h-7 text-[#021f35] absolute -bottom-12 left-179 z-1"></div>
            </div>
        </div>
    )
}

export default page