import EstudarDashboard from "./components/dashboard/EstudarDashboard";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <EstudarDashboard />
    </ThemeProvider>
  );
}

export default App;
