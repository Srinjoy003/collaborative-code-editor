import React from "react";

const OutputWindow = ({ outputDetails }) => {
	const getOutput = () => {
		let statusId = outputDetails?.status?.id;

		if (statusId === 6) {
			// compilation error
			return (
				<pre className="font-normal text-lg text-red-500">
					{atob(outputDetails?.compile_output)}
				</pre>
			);
		} else if (statusId === 3) {
			return (
				<pre className="font-normal text-lg text-green-500">
					{atob(outputDetails.stdout) !== null
						? `${atob(outputDetails.stdout)}`
						: null}
				</pre>
			);
		} else if (statusId === 5) {
			return (
				<pre className="font-normal text-lg text-red-500">
					{`Time Limit Exceeded`}
				</pre>
			);
		} else {
			return (
				<pre className="font-normal text-lg text-red-500">
					{atob(outputDetails?.stderr)}
				</pre>
			);
		}
	};
	return (
		<>
			<div className="w-full h-full rounded-md text-white font-normal text-sm overflow-y-auto mb-10">
				{outputDetails ? <>{getOutput()}</> : null}
			</div>
		</>
	);
};

export default OutputWindow;
