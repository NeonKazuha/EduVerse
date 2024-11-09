
import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-white  text-[1rem] flex justify-center">
      <div className="text-[0.65rem]">
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer text-[0.65rem]" to={to}>
        {buttonText}
      </Link>
    </div>
}
  