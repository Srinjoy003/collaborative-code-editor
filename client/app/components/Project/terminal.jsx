const Terminal = ({ output }) => {
    return (
        <div className="bg-gray-900 text-gray-100 p-4 rounded-md h-full overflow-y-scroll font-mono">
            <pre>{output}</pre>
        </div>
    );
};

export default Terminal;
