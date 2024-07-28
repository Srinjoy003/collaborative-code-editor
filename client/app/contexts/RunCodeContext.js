'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { languageOptions } from "@/app/lib/constants/languageOptions";
import axios from "axios";
import { javascriptDefault } from '../lib/constants/defaultCodeSnippet';
import { toast } from 'react-toastify';



const RunCodeContext = createContext();

export const RunCodeProvider = ({ children }) => {

    const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState(null);
	const [processing, setProcessing] = useState(null);
	const [language, setLanguage] = useState(languageOptions[0]);
    const [code, setCode] = useState({
		text: { html: "", css: "", js: "", program: javascriptDefault },
		lastChangeEditor: "",
		lineNumber: 0,
		column: 0,
		type: "program",
	});

    useEffect(() => {
        console.log("MY CODE", code)
    }, [code])

    const CompileCode = () => {
		setProcessing(true);

		const formData = {
			language_id: language.id,
			source_code: btoa(code.text.program),
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
        <RunCodeContext.Provider value={{ customInput, setCustomInput, processing, setProcessing, outputDetails, setOutputDetails, language, setLanguage, code, setCode, CompileCode }}>
            {children}
        </RunCodeContext.Provider>
    );
};

// Create a custom hook to use the context
export const useRunCode = () => useContext(RunCodeContext);
