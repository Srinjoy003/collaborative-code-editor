import { MdDelete } from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";

export const DropDown = ({
	id,
	handleRenameFile = handleRenameFile = () => {},
	handleDeleteFile: handleKick = handleKick = (e, id) => {},
}) => {
	return (
		<div
			className="absolute z-10 w-[150px] rounded-md border border-darkHover bg-dark p-1 top-2/3 left-1/2"
			
		>
			<button
				onClick={handleRenameFile}
				className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-darkHover"
			>
				<PiPencilSimpleFill size={18} />
				Rename
			</button>
			<button
				onClick={(e) => handleKick(e, id)}
				className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-danger hover:bg-darkHover"
			>
				<MdDelete size={20} />
				Kick
			</button>
		</div>
	);
};
