"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import * as Babel from "@babel/standalone";
import WebDev from "@/app/components/webDev";
import IDE from "@/app/components/IDE";

export default function Home() {
	return (
		<main className="w-screen h-screen overflow-hidden">
			{/* <WebDev /> */}
			<IDE />
		</main>
	);
}
