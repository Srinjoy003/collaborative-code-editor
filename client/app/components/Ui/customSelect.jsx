import { PiCaretDownBold } from "react-icons/pi"



function Select({ onChange, value, options, title }) {
    return (
        <div className="relative w-full">
            <label className="mb-2">{title}</label>
            <select
                className="custom-select w-full rounded-md border-none bg-darkHover px-4 py-2 text-white outline-none"
                value={value}
                onChange={onChange}
            >
            
                  {Object.keys(options).map(option => (
                    <option key={option} value={options[option]}>
                        {option}
                    </option>
                ))}
            </select>
            <PiCaretDownBold
                size={16}
                className="absolute bottom-3 right-4 z-10 text-white"
            />
        </div>
    )
}

export default Select
