
export function Heading({ label,size}) {
  if(size=="mid"){
    return (
      <div className="font-bold text-[1.25rem] pt-1">
        {label}
      </div>
    )
  }
  return <div className="font-bold text-[1.5rem] pt-2">
    {label}
  </div>
}