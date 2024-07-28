"use client";

import Sidebar from "@/app/components/sidebar/Sidebar";
// import { Editor } from "@monaco-editor/react";
import { useSettings } from "@/app/contexts/SettingContext";
import SplitterComponent from "@/app/components/Ui/SplitterComponent";
import Editor from "@/app/components/Project/Editor";


function Test() {
	const { theme } = useSettings();
	return (
		<div className="w-screen h-screen">
			<SplitterComponent>
				<Sidebar />
				<Editor />
			</SplitterComponent>
		</div>
	);
}

export default Test;
