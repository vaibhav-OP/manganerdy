import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight  } from "react-icons/md";

export default function SliderChangeButton({ currentSlide, setcurrentSlide, ulElement }) {
    function moveLeft() {
        if(!ulElement.current) return;

        if(currentSlide == 0){
            setcurrentSlide(ulElement.current.childElementCount-1);
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
        <div className="text-black sm:text-2xl text-lg bottom-5 right-0 p-5 gap-3 absolute sm:flex hidden">
            <div className="sm:w-11 sm:h-11 w-9 h-9 bg-white rounded-full flex justify-center items-center hover:bg-themeLinearGradient hover:dark:bg-darkthemeLinearGradient hover:text-white hover:cursor-pointer" onClick={moveLeft}><MdOutlineKeyboardArrowLeft /></div>
            <div className="sm:w-11 sm:h-11 w-9 h-9 bg-white rounded-full flex justify-center items-center hover:bg-themeLinearGradient hover:dark:bg-darkthemeLinearGradient hover:text-white hover:cursor-pointer" onClick={moveRight}><MdOutlineKeyboardArrowRight /></div>
        </div>
    )
}