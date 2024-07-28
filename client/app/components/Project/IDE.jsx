"use client";

import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import Terminal from "@/app/components/Project/terminal";
import SplitPane from "react-split-pane";
import "@/app/lib/utils/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { languageOptions } from "@/app/lib/constants/languageOptions";
import { classnames } from "@/app/lib/utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputWindow from "@/app/components/Project/OutputWindow";
import CustomInput from "./CustomInput";
import { useSettings } from "@/app/contexts/SettingContext";
import { useRunCode } from "@/app/contexts/RunCodeContext";



export default function IDE({ type, code, setCode, handleEditorOnMount }) {

	const {customInput, setCustomInput, outputDetails} = useRunCode()
	
	const [outputWindowType, setOutputWindowType] = useState(0);
	const { theme } = useSettings();


	

	return (
		<main className="h-screen">
			

			<SplitPane
				split="horizontal"
				minSize={100}
				maxSize={-100}
				defaultSize="50%"
				className="mt-10"
			>
				<Editor
					height="100%"
					defaultLanguage="javascript"
					defaultValue="// Write your code here"
					theme={theme}
					value={code}
					onMount={(editor) => handleEditorOnMount(editor, "program")}
				/>
				<div className="h-full w-full bg-dark p-5">
					<div className="w-full flex gap-10 text-lg">
						<button
							className={`text-center transition-all duration-300 text-blue-300 hover:text-opacity-100 ${
								outputWindowType === 0
									? "text-opacity-100 underline underline-offset-8"
									: "text-opacity-50"
							}`}
							onClick={() => setOutputWindowType(0)}
						>
							Terminal
						</button>
						<button
							className={`text-center transition-all duration-300 text-blue-300 hover:text-opacity-100 ${
								outputWindowType === 1
									? "text-opacity-100 underline underline-offset-8"
									: "text-opacity-50"
							}`}
							onClick={() => setOutputWindowType(1)}
						>
							Input
						</button>
					</div>
					<div className="w-full h-full px-4 py-4 ">
						{outputWindowType === 0 ? (
							<OutputWindow outputDetails={outputDetails} />
						) : (
							<CustomInput
								customInput={customInput}
								setCustomInput={setCustomInput}
							/>
						)}
					</div>
				</div>
			</SplitPane>
		</main>
	);
}
