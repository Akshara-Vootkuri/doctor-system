// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// // import AdminContextProvider from './context/AdminContext.jsx'
// import { AdminContextProvider } from './context/AdminContext.jsx';  // ✅ Fix: Use named import

// import DoctorContextProvider from './context/DoctorContext.jsx'
// import AppContextProvider from './context/AppContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//    <AdminContextProvider>
//     <DoctorContextProvider>
//       <AppContextProvider>

//          <App />
//       </AppContextProvider>
//     </DoctorContextProvider>
//    </AdminContextProvider>
//   </BrowserRouter>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// ✅ Correct import: Use default import, NOT named import
import AdminContextProvider from './context/AdminContext.jsx';
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
);
