
export function InputBox({ label, placeholder, onChange }) {
  return <div className="my-1">
    <div className="text-[0.75rem] my-[10px] font-[400] text-left">
      {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} className=" px-1 w-52 py-[5px] text-[0.75rem] border rounded border-slate-200" />
  </div>
}