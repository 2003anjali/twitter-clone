import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/custom.css"   

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="twitter-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

