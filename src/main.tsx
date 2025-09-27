import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";


// Force dark mode
document.documentElement.classList.add('dark');
createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js');
	});
}
