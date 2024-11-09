export function SubHeading({ label,size}) {
  if(size=="large"){
    return <div className="text-white text-2xl font-[600] pt-1 px-2 pb-2">
      {label}
    </div>
  }
  return <div className="text-white text-sm font-[600] pt-1 px-2 pb-2">
    {label}
  </div>
}
