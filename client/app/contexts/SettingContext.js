"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "../lib/utils/allThemes.json";
import { useMonaco } from "@monaco-editor/react";
import useLocalStorage from "../hooks/useLocalStorage";

const SettingsContext = createContext();

const defaultSettings = {
	theme: "vs-dark",
	fontSize: 16,
	fontFamily: "Space Mono",
};

export const SettingsProvider = ({ children }) => {
	const { getItem } = useLocalStorage();
	const monaco = useMonaco();

	const storedSettings = JSON.parse(getItem("settings") || "{}");
	const storedTheme =
		storedSettings.theme !== undefined
			? storedSettings.theme
			: defaultSettings.theme;

	const storedFontSize =
		storedSettings.fontSize !== undefined
			? storedSettings.fontSize
			: defaultSettings.fontSize;
	const storedFontFamily =
		storedSettings.fontFamily !== undefined
			? storedSettings.fontFamily
			: defaultSettings.fontFamily;

	const [theme, setTheme] = useState(storedTheme);
	const [fontSize, setFontSize] = useState(storedFontSize);
	const [fontFamily, setFontFamily] = useState(storedFontFamily);
	const [name, setName] = useState('index.js');
	const [language, setLanguage] = useState('js');

	const resetSettings = () => {
		setTheme(defaultSettings.theme);
		setFontSize(defaultSettings.fontSize);
		setFontFamily(defaultSettings.fontFamily);
	};

	useEffect(() => {
		if (monaco) {
			Object.keys(themes).forEach((themeName) => {
				monaco.editor.defineTheme(themeName, themes[themeName]);
			});
		}
	}, [monaco]);

	useEffect(() => {
		const updatedSettings = {
			theme,
			fontSize,
			fontFamily,
		};
	
		localStorage.setItem("settings", JSON.stringify(updatedSettings));
	}, [theme, fontSize, fontFamily]);

	return (
		<SettingsContext.Provider
			value={{
				theme,
				setTheme,
				fontSize,
				setFontSize,
				fontFamily,
				setFontFamily,
				resetSettings,
				name,
				setName,
				language,
				setLanguage
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SettingsContext);
