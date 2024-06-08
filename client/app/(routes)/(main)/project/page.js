"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import * as Babel from "@babel/standalone";
import Terminal from "../../../components/terminal";

export default function Home() {
	const [output, setOutput] = useState("");
	const [code, setCode] = useState("");
	const editorRef = useRef(null);

	const executeCode = () => {
		const code = editorRef.current.getValue();
		let capturedLogs = [];

		const captureLog = (...args) => {
			capturedLogs.push(args.join(" "));
		};

		try {
			const transpiledCode = Babel.transform(code, { presets: ["env"] }).code;
			const wrappedCode = `
				(function() {
					const console = {
						log: captureLog
					};
					${transpiledCode}
				})();
			`;
			const captureLogFn = new Function("captureLog", wrappedCode);
			captureLogFn(captureLog);
			setOutput(capturedLogs.join("\n"));
		} catch (error) {
			setOutput(`Error: ${error.message}`);
		}
	};

	return (
		<main className="h-screen py-10">
			<div className="flex mb-4">
				<button
					className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300"
					onClick={executeCode}
				>
					Run Code
				</button>
			</div>
			<Editor
				height="50%"
				defaultLanguage="javascript"
				defaultValue="// Write your code here"
				onMount={(editor) => (editorRef.current = editor)}
				theme="vs-dark"
				value={code}
				onChange={(value) => setCode(value)}
			/>
			<div className="h-1/2">
				<Terminal output={output} />
			</div>
		</main>
	);
}
