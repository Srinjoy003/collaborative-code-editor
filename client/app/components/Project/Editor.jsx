"use client";
import { io } from "socket.io-client";
import IDE from "@/app/components/Project/IDE";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import WebDev from "@/app/components/Project/webDev";
import SocketEvent from "@/app/lib/constants/sockets";
import { useSocket } from "@/app/contexts/SocketContext";
import { useRunCode } from "@/app/contexts/RunCodeContext";

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

export default function Editor() {
	const { socket, setSocket } = useSocket();

	// const [code, setCode] = useState({
	// 	text: { html: "", css: "", js: "", program: javascriptDefault },
	// 	lastChangeEditor: "",
	// 	lineNumber: 0,
	// 	column: 0,
	// 	type: "program",
	// });

	const { code, setCode } = useRunCode();
	const [users, setUsers] = useState({});

	const codeRefs = {
		programRef: useRef(null),
		htmlRef: useRef(null),
		cssRef: useRef(null),
		jsRef: useRef(null),
	};

	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const name = searchParams.get("name");
	const language = searchParams.get("language");

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
							hoverMessage: { value: "byee" },
						},
						inlineClassNameValues: {
							"--cursor-color": user.color,
							"--cursor-message": `byee`,
							"data-cursor-message": "byeee",
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

	// useEffect(() => {
	// 	const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
	// 		reconnection: false,
	// 	});

	// 	setSocket(socket);

	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, []);

	useEffect(() => {
		// if (prevCodeRef.current !== code.text && !updatingRef.current) {
		if (!isEqual(prevCodeRef.current, code.text) && !updatingRef.current) {
			socket.emit(SocketEvent.UPDATE_CODE, code);
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

			socket.on(SocketEvent.UPDATE_CODE, (newCode, socketID) => {
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

			socket.on(SocketEvent.SYNC_CODE, (socketId) => {
				const sendCode = {
					text: latestCodeRef.current,
					lineNumber: 0,
					column: 0,
				};
				socket.emit(SocketEvent.SYNC_CODE, sendCode, socketId);
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
			<button
				className={`bg-secondary
					border-t-blue-300 text-blue-300
				px-6 py-2 border-t-2 flex items-center justify-center gap-3 cursor-pointer`}
			>
				{/* <FaHtml5 className="text-xl text-red-500" /> */}
				<p className="font-semibold">index.js</p>
			</button>
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
