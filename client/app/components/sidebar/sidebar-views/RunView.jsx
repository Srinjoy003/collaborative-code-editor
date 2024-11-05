import useResponsive from "@/app/hooks/useResponsive";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";
import { IoShareOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { IoMdDownload } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { useRunCode } from "@/app/contexts/RunCodeContext";
import { classnames } from "@/app/lib/utils/general";

function RunView() {
	const { viewHeight } = useResponsive();

	const { CompileCode, processing, code } = useRunCode();

	const handleLanguageChange = (e) => {
		const lang = JSON.parse(e.target.value);
		setSelectedLanguage(lang);
	};

	const copyOutput = () => {
		navigator.clipboard.writeText(code.text.program);
		toast.success("Output copied to clipboard");
	};

	const downloadCodeAsFile = () => {
		const content = code.text.program;
		const blob = new Blob([content], { type: 'text/javascript' }); // change later depending on type of file
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);

		link.download = 'code.js'; // change later depending on type of file
	
		document.body.appendChild(link);
		link.click();
		toast.success("Code downloaded");
		document.body.removeChild(link);

	};

	return (
		<div
			className="flex flex-col items-center gap-2 p-4 text-white"
			style={{ height: viewHeight }}
		>
			<h1 className="view-title">Run Code</h1>
			<div className="flex h-[90%] w-full flex-col justify-between items-end gap-2 md:h-[92%]">
				<button
					className={classnames(
						"flex w-full justify-center rounded-md bg-primaryBlue p-2 font-bold text-white outline-none disabled:cursor-not-allowed disabled:opacity-50",
						!code.text.program ? "opacity-50 cursor-not-allowed" : ""
					)}
					onClick={CompileCode}
					disabled={!code.text.program}
				>
					{processing ? (
						<div className="flex items-center">
							<span className="mr-2">Processing...</span>
							<svg
								className="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</div>
					) : (
						"Run"
					)}
				</button>
				
				<div className="w-full flex flex-col items-center gap-4 pt-4">
					<div className="flex w-full gap-4">
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-white p-3 text-black"
							title="Download Code"
							onClick={downloadCodeAsFile}
						>
							<IoMdDownload size={26} />
						</button>
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-white p-3 text-black"
							title="Copy Code"
							onClick={copyOutput}
						>
							<LuCopy size={22} />
						</button>
						<button
							className="flex flex-grow items-center justify-center rounded-md bg-[#2263fe] p-3 text-white"
							title="Save Project"
						>
							{/* <IoSaveOutline size={26} /> */}
							<TfiSave size={22} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RunView;
