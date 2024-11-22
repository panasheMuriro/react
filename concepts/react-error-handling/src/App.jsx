import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import ProfilePage from './components/Profile'

function App() {


  return (
    <>
    <ErrorBoundary>
      <ProfilePage/>
    </ErrorBoundary>
      
    </>
  )
}

export default App
