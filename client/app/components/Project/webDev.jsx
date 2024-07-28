"use client";

import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import "@/app/lib/utils/styles.css";
import { FaCss3, FaHtml5 } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useSettings } from "@/app/contexts/SettingContext";

function WebDev({ handleEditorOnMount, code }) {
	const [output, setOutput] = useState("");
	const [option, setOption] = useState("html");
	const { theme } = useSettings();


	const updateOutput = () => {
		const combinedOutput = `
            <html>
                <head>
                    <style>${code.css}</style>
                </head>
                <body>
                    ${code.html}
                    <script>${code.js}</script>
                </body>
            </html>
        `;

		// console.log(combinedOutput)

		setOutput(combinedOutput);
	};

	useEffect(() => {
		updateOutput();
	}, [code]);

	return (
		<>
			{/* <div className="w-screen h-screen md:flex flex-col overflow-hidden bg-[#131417] hidden">
				<div>
					<SplitPane
						split="horizontal"
						minSize={100}
						maxSize={-100}
						defaultSize="50%"
					>
						<SplitPane split="vertical" minSize={200} defaultSize={"33%"}>
							<div className="w-full h-full flex flex-col items-start justify-start">
								<div className="w-full flex items-center justify-between">
									<div className="bg-secondary border-t-gray-500 px-4 py-2 border-t-4 flex items-center justify-center gap-3">
										<FaHtml5 className="text-xl text-red-500" />
										<p className="text-primaryText font-semibold">HTML</p>
									</div>
									
								</div>
								<div className="w-full h-full">
									<Editor
										height="100%"
										defaultLanguage="html"
										theme="vs-dark"
										value={code.html}
										onMount={(editor) => handleEditorOnMount(editor, "html")}
									/>
								</div>
							</div>

							<SplitPane split="vertical" minSize={200} defaultSize={"50%"}>
								<div className="w-full h-full flex flex-col items-start justify-start">
									<div className="w-full flex items-center justify-between">
										<div className="bg-secondary border-t-gray-500 px-4 py-2 border-t-4 flex items-center justify-center gap-3">
											<FaCss3 className="text-lg text-sky-500" />
											<p className="text-primaryText font-semibold">CSS</p>
										</div>
									
									</div>
									<div className="w-full h-full">
										<Editor
											height="100%"
											defaultLanguage="css"
											theme="vs-dark"
											value={code.css}
											onMount={(editor) => handleEditorOnMount(editor, "css")}
										/>
									</div>
								</div>

								<div className="w-full h-full flex flex-col items-start justify-start">
									<div className="w-full flex items-center justify-between">
										<div className="bg-secondary border-t-gray-500 px-4 py-2 border-t-4 flex items-center justify-center gap-3">
											<BiLogoJavascript className="text-xl text-yellow-500" />
											<p className="text-primaryText font-semibold">JS</p>
										</div>
									
									</div>
									<div className="w-full h-full">
										<Editor
											width="100%"
											height="100%"
											defaultLanguage="javascript"
											theme="vs-dark"
											value={code.js}
											onMount={(editor) => handleEditorOnMount(editor, "js")}
										/>
									</div>
								</div>
							</SplitPane>
						</SplitPane>

						<div
							className="bg-white overflow-hidden"
							style={{ overflow: "hidden", height: "100%" }}
						>
							<iframe
								title="result"
								srcDoc={output}
								style={{ border: "none", width: "100%", height: "100%" }}
							/>
						</div>
					</SplitPane>
				</div>
			</div> */}
			<div className="w-screen h-screen flex flex-col overflow-hidden bg-[#131417]">
				<div>
					<SplitPane
						split="horizontal"
						minSize={100}
						maxSize={-100}
						defaultSize="50%"
					>
						<div className="w-full h-full flex flex-col items-start justify-start bg-black">
							<div className="w-full flex items-center gap-2">
								<button
									className={`bg-secondary ${
										option === "html"
											? "border-t-blue-300 text-blue-300"
											: "border-t-gray-500 text-primaryText"
									} px-4 py-2 border-t-4 flex items-center justify-center gap-3 cursor-pointer`}
									onClick={() => setOption("html")}
								>
									<FaHtml5 className="text-xl text-red-500" />
									<p className="font-semibold">HTML</p>
								</button>
								<button
									className={`bg-secondary ${
										option === "css"
											? "border-t-blue-300 text-blue-300"
											: "border-t-gray-500 text-primaryText"
									} px-4 py-2 border-t-4 flex items-center justify-center gap-3 cursor-pointer`}
									onClick={() => setOption("css")}
								>
									<FaCss3 className="text-lg text-sky-500" />
									<p className="font-semibold">CSS</p>
								</button>
								<button
									className={`bg-secondary ${
										option === "js"
											? "border-t-blue-300 text-blue-300"
											: "border-t-gray-500 text-primaryText"
									} px-4 py-2 border-t-4 flex items-center justify-center gap-3 cursor-pointer`}
									onClick={() => setOption("js")}
								>
									<BiLogoJavascript className="text-xl text-yellow-500" />
									<p className="font-semibold">JS</p>
								</button>
							</div>

							<div className="w-full h-full">
								{option === "html" && (
									<Editor
										height="100%"
										defaultLanguage="html"
										theme={theme}
										value={code.html}
										onMount={(editor) => handleEditorOnMount(editor, "html")}
									/>
								)}
								{option === "css" && (
									<Editor
										height="100%"
										defaultLanguage="css"
										theme={theme}
										value={code.css}
										onMount={(editor) => handleEditorOnMount(editor, "css")}
									/>
								)}
								{option === "js" && (
									<Editor
										height="100%"
										defaultLanguage="js"
										theme={theme}
										value={code.js}
										onMount={(editor) => handleEditorOnMount(editor, "js")}
									/>
								)}
							</div>
						</div>
						<div
							className="bg-white overflow-hidden"
							style={{ overflow: "hidden", height: "100%" }}
						>
							<iframe
								title="result"
								srcDoc={output}
								style={{ border: "none", width: "100%", height: "100%" }}
							/>
						</div>
					</SplitPane>
				</div>
			</div>
		</>
	);
}

export default WebDev;
