export default function TemplateList() {
    const templates = ['Node.js', 'Python', 'HTML, CSS, JS', 'C++', 'C'];
  
    return (
      <ul className="mb-4">
        {templates.map((template, index) => (
          <li key={index} className="p-2 border rounded mb-2">
            {template}
          </li>
        ))}
      </ul>
    );
  }
  