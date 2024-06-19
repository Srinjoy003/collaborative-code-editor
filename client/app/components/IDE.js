"use client";

import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import Terminal from "@/app/components/terminal";
import SplitPane from "react-split-pane";
import "@/app/lib/utils/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { languageOptions } from "@/app/lib/constants/languageOptions";
import { classnames } from "@/app/lib/utils/general";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputWindow from "@/app/components/OutputWindow";
import CustomInput from "./CustomInput";


const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

export default function IDE({type, code, setCode, handleEditorOnMount}) {
	// const [code, setCode] = useState(javascriptDefault);
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState(null);
	const [processing, setProcessing] = useState(null);
	const [theme, setTheme] = useState("cobalt");
	const [language, setLanguage] = useState(languageOptions[0]);
	const [outputWindowType, setOutputWindowType] = useState(0);

	const onSelectChange = (sl) => {
		console.log("selected Option...", sl);
		setLanguage(sl);
	};

	const onChange = (data) => {
		setCode((prevCode) => ({
			...prevCode,
			text: data,
		}));
	};

	const handleCompile = () => {
		setProcessing(true);

		const formData = {
			language_id: language.id,
			source_code: btoa(code),
			stdin: btoa(customInput),
		};
		const options = {
			method: "POST",
			url: process.env.NEXT_PUBLIC_RAPID_API_URL,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"Content-Type": "application/json",
				"X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
				"X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
			},
			data: formData,
		};

		axios
			.request(options)
			.then(function (response) {
				console.log("res.data", response.data);
				const token = response.data.token;
				checkStatus(token);
			})
			.catch((err) => {
				let error = err.response ? err.response.data : err;
				const status = err.response ? err.response.status : 500;
				console.log("status", status);
				if (status === 429) {
					console.log("too many requests", status);

					showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
				}
				setProcessing(false);
				console.log("catch block...", error);
			});
	};

	const checkStatus = async (token) => {
		const options = {
			method: "GET",
			url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
			params: { base64_encoded: "true", fields: "*" },
			headers: {
				"X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
				"X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
			},
		};
		try {
			let response = await axios.request(options);
			let statusId = response.data.status?.id;

			// Processed - we have a result
			if (statusId === 1 || statusId === 2) {
				// still processing
				setTimeout(() => {
					checkStatus(token);
				}, 2000);
				return;
			} else {
				setProcessing(false);
				setOutputDetails(response.data);
				showSuccessToast(`Compiled Successfully!`);
				console.log("response.data", response.data);
				return;
			}
		} catch (err) {
			console.log("err", err);
			setProcessing(false);
			showErrorToast();
		}
	};

	const showSuccessToast = (msg) => {
		toast.success(msg || `Compiled Successfully!`, {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
	const showErrorToast = (msg, timer) => {
		toast.error(msg || `Something went wrong! Please try again.`, {
			position: "top-right",
			autoClose: timer ? timer : 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<main className="h-screen py-10">
			
			<button
				onClick={handleCompile}
				disabled={!code}
				className={classnames(
					"mt-14 border-2 border-transparent rounded-md shadow-md px-4 py-2 hover:shadow-lg transition duration-200 text-white flex-shrink-0",
					!code
						? "opacity-50 cursor-not-allowed"
						: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
				)}
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
					"Compile and Execute"
				)}
			</button>

			<SplitPane
				split="horizontal"
				minSize={100}
				maxSize={-100}
				defaultSize="50%"
				className="mt-4"
			>
				<Editor
					height="100%"
					defaultLanguage="javascript"
					defaultValue="// Write your code here"
					theme="vs-dark"
					value={code.text}
					onChange={onChange}
					onMount={handleEditorOnMount}
				/>
				<div className="h-full w-full bg-gray-900 p-5">
					<div className="w-full flex gap-10 text-lg">
						<button
							className={`text-center hover:text-yellow-300 transition-all duration-300 ${
								outputWindowType === 0
									? "text-yellow-300 underline underline-offset-8"
									: "text-gray-200"
							}`}
							onClick={() => setOutputWindowType(0)}
						>
							Terminal
						</button>
						<button
							className={`text-center hover:text-yellow-300 transition-all duration-300 ${
								outputWindowType === 1
									? "text-yellow-300 underline underline-offset-8"
									: "text-gray-200"
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
