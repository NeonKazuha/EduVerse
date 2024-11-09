

export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" 
    class="w-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-[20px] me2 mb-2">{label}</button>
}
  