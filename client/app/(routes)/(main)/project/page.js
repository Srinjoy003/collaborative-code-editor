"use client";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import IDE from "@/app/components/IDE";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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

export default function Home() {
	const [socket, setSocket] = useState(io({ autoConnect: false }));
	const [code, setCode] = useState({
		text: javascriptDefault,
		lineNumber: 0,
		column: 0,
	});
	const searchParams = useSearchParams();
	const type = searchParams.get("type");

	const editorRef = useRef(null);
	const prevCodeRef = useRef(code.text);
	const updatingRef = useRef(false);
	const latestCodeRef = useRef(code.text);

	const [users, setUsers] = useState({
	});

	const decorationsRef = useRef([]);
	const timersRef = useRef({});

	// useEffect(() => {
	//   setUsers((prevUsers) => ({
	// 	...prevUsers,
	// 	user2: {
	// 	  ...prevUsers.user2,
	// 	  lineNumber: code.lineNumber,
	// 	  column: code.column,
	// 	},
	//   }));
	// }, [code]);

	// useEffect(() => {
	// 	setUsers((prevUsers) => ({
	// 	  ...prevUsers,
	// 	  [`user${Object.keys(prevUsers).length + 1}`]: {
	// 		lineNumber: code.lineNumber,
	// 		column: code.column,
	// 		name: `User ${Object.keys(prevUsers).length + 1}`  // You can assign a name dynamically if needed
	// 	  },
	// 	}));

	//   }, [code]);
  
	useEffect(() => {
		console.log(users)
	  updateCursors();
	}, [users]);
  
	const updateCursors = () => {
	  const editor = editorRef.current;
	  if (!editor) return;
  
	  // Remove previous decorations
	//   editor.deltaDecorations(decorationsRef.current, []);
  
	  const decorations = Object.entries(users).map(([key, user]) => ({
		range: new monaco.Range(
		  user.lineNumber,
		  user.column,
		  user.lineNumber,
		  user.column
		),
		options: {
		  className: `custom-cursor`,
		  afterContentClassName: `username-${key}`,
		  hoverMessage: { value: user.name },
		},
	  }));
  
	  decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations);
	  Object.keys(users).forEach((key) => {
		if (timersRef.current[key]) {
		  clearTimeout(timersRef.current[key]);
		}
		timersRef.current[key] = setTimeout(() => {
		  removeCursor(key);
		}, 5000);
	  });
	};



	const removeCursor = (key) => {
		const editor = editorRef.current;
		if (!editor) return;
	
		// Remove the user's decoration
		setUsers((prevUsers) => {
		  const updatedUsers = { ...prevUsers };
		  delete updatedUsers[key];
		  return updatedUsers;
		});
	  };

	useEffect(() => {
		const socket = io("http://localhost:4000", { reconnection: false });

		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (prevCodeRef.current !== code.text && !updatingRef.current) {
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
				if (prevCodeRef.current !== newCode.text) {
					updatingRef.current = true; // Set the flag
					setCode(newCode);
					setUsers((prevUsers) => ({
						...prevUsers,
						[socketID]: {
						  lineNumber: newCode.lineNumber,
						  column: newCode.column,
						  name: name  // You can assign a name dynamically if needed
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

	const handleEditorDidMount = (editor) => {
		editorRef.current = editor;
		console.log();
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
			setCode({
				text: updatedCode,
				lineNumber: startLineNumber,
				column: endColumn,
			});
		});

		// updateCursors();
	};

	return (
		<main className="w-screen h-screen overflow-hidden">
			{type === "web" ? (
				<WebDev />
			) : (
				<IDE
					type={type}
					code={code}
					setCode={setCode}
					handleEditorOnMount={handleEditorDidMount}
				/>
			)}
		</main>
	);
}
