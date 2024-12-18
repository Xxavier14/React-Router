import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const NAVIGATION_EVENT = 'pushstate'

function navigate (href){
  window.history.pushState({},'',href)
  // Modifica la Url sin recargar la pagina
  const navigationEvent = new Event(NAVIGATION_EVENT)
  window.dispatchEvent(navigationEvent
  //evento como flag
  )
}

function HomePage (){
  return(
    <>
      <h1>Home</h1>
      <p>Lorem, ipsum.</p>
      <button onClick={() => navigate('/about')} href="/about">Link sobre nosotros</button>
    </>
  )
}
function AboutPage (){
  return(
    <>
      <h1>About</h1>
      <p>Lorem, ipsum. Lorem</p>
      <button onClick={()=> navigate('/')} href="/">Link pagina principal</button>
    </>
  )
}


function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(()=> {
    const onLocationChange = () =>{
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(NAVIGATION_EVENT, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
    }
  }, [])

  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  )
}

export default App
