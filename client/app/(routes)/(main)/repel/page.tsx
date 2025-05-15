"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { languageOptions } from "@/app/lib/constants/languageOptions";


const existingProjects = [
	{
		name: "Collaborative Editor",
		language: "JavaScript",
		users: ["Alice", "Bob"],
	},
	{ name: "AI Chatbot", language: "Python", users: ["Charlie", "David"] },
	{ name: "Game Engine", language: "C++", users: ["Eve", "Frank"] },
];

export default function ProjectCreation() {
	const [projectName, setProjectName] = useState("");
	const [description, setDescription] = useState("");
	const [language, setLanguage] = useState(63);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleCreateProject = () => {
		if (!projectName.trim()) return;

		setLoading(true); 

		console.log({ projectName, description, language });

		// Navigate with URL parameters
		router.push(
			`/project?name=${encodeURIComponent(
				projectName
			)}&language=${encodeURIComponent(language)}`
		);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 p-6 space-y-20">
			<div className="w-full max-w-2xl mt-32 p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
				<h2 className="text-4xl font-bold mb-8 text-center text-blue-400">
					🚀 Create New Project
				</h2>
				<div className="space-y-6">
					<input
						type="text"
						placeholder="Project Name"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<textarea
						placeholder="Project Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={4}
					></textarea>
					<select
						value={language}
						onChange={(e) => setLanguage(Number(e.target.value))}
						className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{languageOptions.map((lang) => (
							<option
								key={lang.id}
								value={lang.id}
								className="bg-gray-800 text-white"
							>
								{lang.name}
							</option>
						))}
					</select>
					<button
						onClick={handleCreateProject}
						className="w-full p-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
						disabled={loading}
					>
						{loading ? (
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
									d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								></path>
							</svg>
						) : (
							"✨ Create Project"
						)}
					</button>

				</div>
			</div>

			<div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
				<h3 className="text-2xl font-semibold mb-8 text-blue-400">
					📂 Existing Projects
				</h3>
				<div className="space-y-6">
					{existingProjects.map((project, index) => (
						<div
							key={index}
							className="p-3 bg-gray-700 rounded-lg border border-gray-600 transition duration-300 hover:bg-gray-600 hover:shadow-lg w-full"
							onClick={() => {
								router.push("/project");
							}}
						>
							<h4 className="text-lg font-bold text-white">{project.name}</h4>
							<p className="text-sm text-gray-400">
								Language: {project.language}
							</p>
							<p className="text-sm text-gray-400">
								Collaborators: {project.users.join(", ")}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
