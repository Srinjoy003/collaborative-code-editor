/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "#131417",
				secondary: "#1E1F26",
				primaryText: "#868CA0",
				text555: "#555",

				dark: "#212429",
				darkHover: "#3D404A",
				light: "#f5f5f5",
				primary: "#39E079",
			},
		},
	},
	plugins: [],
};
