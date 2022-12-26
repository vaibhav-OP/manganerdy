import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight  } from "react-icons/md";

export default function({ currentSlide, setcurrentSlide, ulElement }) {
    function moveLeft() {
        if(!ulElement.current) return;

        if(currentSlide == 0){
            setcurrentSlide(5);
        } else {
            setcurrentSlide(currentSlide => currentSlide - 1);
        }
    }

    function moveRight() {
        if(!ulElement.current) return;

        if(ulElement.current.childElementCount-1 == currentSlide){
            setcurrentSlide(0);
        } else {
            setcurrentSlide(currentSlide => currentSlide + 1);
        }
    }
    return(
        <div className="text-black text-2xl bottom-0 left-0 p-5 gap-3 absolute hidden sm:flex">
            <div className="w-11 h-11 bg-white rounded-full flex justify-center items-center hover:bg-themeLinearGradient hover:dark:bg-darkthemeLinearGradient hover:text-white hover:cursor-pointer" onClick={moveLeft}><MdOutlineKeyboardArrowLeft /></div>
            <div className="w-11 h-11 bg-white rounded-full flex justify-center items-center hover:bg-themeLinearGradient hover:dark:bg-darkthemeLinearGradient hover:text-white hover:cursor-pointer" onClick={moveRight}><MdOutlineKeyboardArrowRight /></div>
        </div>
    )
}