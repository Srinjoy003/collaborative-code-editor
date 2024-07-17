"use client";

import Sidebar from "@/app/components/sidebar/Sidebar";
import { Editor } from "@monaco-editor/react";
import { useSettings } from "@/app/contexts/SettingContext";
import SplitPane from "react-split-pane";

function Test() {
	const { theme } = useSettings();
	return (
		<div className="w-screen h-screen">
			{/* <SplitterComponent> */}
			<SplitPane split="vertical" minSize={200} defaultSize={"50%"}>
				<Sidebar />
				<Editor theme={theme} />
			</SplitPane>
			{/* <Editor /> */}
			{/* </SplitterComponent> */}
		</div>
	);
}

export default Test;
