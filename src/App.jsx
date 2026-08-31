import { useState } from 'react'
import demons from './data/demons.json'

function App() {
  // Set secret demon
  const [secretDemon, setSecretDemon] = useState(null);
  console.log(secretDemon);
  
  function chooseRandomDemon() {
        const randomIndex = Math.floor(Math.random() * demons.length)
        setSecretDemon(demons[randomIndex])
    }

    return (
        <>
          <h1>MegatenGuesser</h1>

          <button onClick={chooseRandomDemon}>
              Sortear demônio
          </button>

          {secretDemon && (
            <p>
                Demônio secreto: {secretDemon.name}
            </p>
          )}
        </>
    )
}

export default App