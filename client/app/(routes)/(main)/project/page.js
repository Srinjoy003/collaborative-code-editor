"use client";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import IDE from "@/app/components/IDE";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import WebDev from "@/app/components/webDev";

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

function isEqual(obj1, obj2) {
	if (obj1 === obj2) return true;

	if (
		typeof obj1 !== "object" ||
		typeof obj2 !== "object" ||
		obj1 == null ||
		obj2 == null
	) {
		return false;
	}

	let keys1 = Object.keys(obj1);
	let keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
}

export default function Home() {
	const [socket, setSocket] = useState(io({ autoConnect: false }));
	const [code, setCode] = useState({
		text: { html: "", css: "", js: "", program: javascriptDefault },
		lastChangeEditor: "",
		lineNumber: 0,
		column: 0,
		type: "program",
	});
	const [users, setUsers] = useState({});

	const codeRefs = {
		programRef: useRef(null),
		htmlRef: useRef(null),
		cssRef: useRef(null),
		jsRef: useRef(null),
	};

	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	// const type = "web";

	const editorRef = useRef(null);
	const prevCodeRef = useRef(code.text);
	const updatingRef = useRef(false);
	const latestCodeRef = useRef(code.text);

	const decorationsRef = useRef([]);
	const timersRef = useRef({});

	useEffect(() => {
		console.log(users);
		updateCursors();
	}, [users]);

	// const updateCursors = () => {
	// 	const editor = codeRefs.programRef.current;
	// 	if (!editor) return;

	// 	const decorations = Object.entries(users).map(([key, user]) => ({
	// 		range: new monaco.Range(
	// 			user.lineNumber,
	// 			user.column,
	// 			user.lineNumber,
	// 			user.column
	// 		),
	// 		options: {
	// 			className: `custom-cursor`,
	// 			inlineClassNameOptions: {
	// 				inlineClassName: `custom-cursor-${key}`,
	// 				hoverMessage: { value: "bye" },
	// 			},
	// 			inlineClassNameValues: {
	// 				"--cursor-color": user.color,
	// 				"--cursor-message": `hello`,
	// 			},
	// 		},
	// 	}));

	// 	decorationsRef.current = editor.deltaDecorations(
	// 		decorationsRef.current,
	// 		decorations
	// 	);
	// 	Object.keys(users).forEach((key) => {
	// 		if (timersRef.current[key]) {
	// 			clearTimeout(timersRef.current[key]);
	// 		}
	// 		timersRef.current[key] = setTimeout(() => {
	// 			removeCursor(key);
	// 		}, 5000);
	// 	});
	// };

	// const removeCursor = (key) => {
	// 	const editor = codeRefs.programRef.current;
	// 	if (!editor) return;

	// 	// Remove the user's decoration
	// 	setUsers((prevUsers) => {
	// 		const updatedUsers = { ...prevUsers };
	// 		delete updatedUsers[key];
	// 		return updatedUsers;
	// 	});
	// };

	const updateCursors = () => {
		const editors = {
			html: codeRefs.htmlRef.current,
			css: codeRefs.cssRef.current,
			js: codeRefs.jsRef.current,
			program: codeRefs.programRef.current,
		};

		Object.keys(editors).forEach((type) => {
			const editor = editors[type];
			if (!editor) return;

			const decorations = Object.entries(users)
				.filter(([key, user]) => user.type === type)
				.map(([key, user]) => ({
					range: new monaco.Range(
						user.lineNumber,
						user.column,
						user.lineNumber,
						user.column
					),
					options: {
						className: `custom-cursor`,
						inlineClassNameOptions: {
							inlineClassName: `custom-cursor-${key}`,
							hoverMessage: { value: "bye" },
						},
						inlineClassNameValues: {
							"--cursor-color": user.color,
							"--cursor-message": `hello`,
						},
					},
				}));

			decorationsRef.current[type] = editor.deltaDecorations(
				decorationsRef.current[type] || [],
				decorations
			);

			Object.keys(users).forEach((key) => {
				if (timersRef.current[key]) {
					clearTimeout(timersRef.current[key]);
				}
				timersRef.current[key] = setTimeout(() => {
					removeCursor(type, key);
				}, 5000);
			});
		});
	};

	const removeCursor = (type, key) => {
		const editor = codeRefs[type + "Ref"].current;
		if (!editor) return;

		// Remove the user's decoration
		setUsers((prevUsers) => {
			const updatedUsers = { ...prevUsers };
			delete updatedUsers[key];
			return updatedUsers;
		});
	};

	// const removeCursor = (type, key) => {
	// 	const editor = codeRefs[type + "Ref"].current;
	// 	if (!editor) return;

	// 	const newDecorations = decorationsRef.current[type].filter(
	// 		(decoration) =>
	// 			!decoration.options.inlineClassNameOptions.inlineClassName.includes(
	// 				`custom-cursor-${key}`
	// 			)
	// 	);

	// 	decorationsRef.current[type] = editor.deltaDecorations(
	// 		decorationsRef.current[type],
	// 		newDecorations
	// 	);

	// };

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
			reconnection: false,
		});

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		// if (prevCodeRef.current !== code.text && !updatingRef.current) {
		if (!isEqual(prevCodeRef.current, code.text) && !updatingRef.current) {
			socket.emit("update-code", code);
			console.log("Emitted code:", code);
		} else {
			console.log(prevCodeRef.current, code.text);
		}
		prevCodeRef.current = code.text;
		latestCodeRef.current = code.text;
		updatingRef.current = false; // Reset the flag
	}, [code, socket]);

	useEffect(() => {
		if (socket) {
			console.log("Listening");

			socket.on("update-code", (newCode, socketID) => {
				// if (prevCodeRef.current !== newCode.text) {
				if (!isEqual(prevCodeRef.current, newCode.text)) {
					updatingRef.current = true; // Set the flag
					setCode(newCode);
					setUsers((prevUsers) => ({
						...prevUsers,
						[socketID]: {
							lineNumber: newCode.lineNumber,
							column: newCode.column,
							type: newCode.type,
							name: name, // You can assign a name dynamically if needed
						},
					}));
					console.log("Received code:", newCode);
				}
			});

			socket.on("sync-code", (socketId) => {
				const sendCode = {
					text: latestCodeRef.current,
					lineNumber: 0,
					column: 0,
				};
				socket.emit("sync-code", sendCode, socketId);
			});
		}
	}, [socket]);

	const handleEditorOnMount = (editor, type) => {
		codeRefs[type + "Ref"].current = editor;

		editor.onDidChangeModelContent((event) => {
			const changes = event.changes[0];
			const { range, text } = changes;
			const { startLineNumber, startColumn, endLineNumber, endColumn } = range;
			const updatedCode = editor.getModel().getValue();
			console.log(
				"Content changed at line:",
				startLineNumber,
				"column:",
				startColumn,
				updatedCode
			);

			setCode((prevCode) => ({
				text: { ...prevCode.text, [type]: updatedCode },
				lineNumber: endLineNumber,
				column: endColumn,
				type: type,
			}));
		});
	};

	return (
		<main className="w-screen h-screen overflow-hidden">
			{type === "web" ? (
				<WebDev handleEditorOnMount={handleEditorOnMount} code={code.text} />
			) : (
				<IDE
					type={type}
					code={code.text.program}
					setCode={setCode}
					handleEditorOnMount={handleEditorOnMount}
				/>
			)}
		</main>
	);
}
