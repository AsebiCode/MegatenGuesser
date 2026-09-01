import { useEffect, useState } from 'react'
import demons from './data//demons.json'
import confetti from 'canvas-confetti'

function App() {
    const [secretDemon, setSecretDemon] = useState(null)
    const [guess, setGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    // define status de vitória do jogo para travar o input
    const [gameWon, setGameWon] = useState(false)

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * demons.length)
        setSecretDemon(demons[randomIndex])
    }, [])

    function compareValue(guessValue, secretValue) {
        if (guessValue === secretValue) {
            return 'correct'
        }

        if (guessValue < secretValue) {
            return 'higher'
        }

        return 'lower'
    }

    function hasCommonValue(guessArray, secretArray) {
        return guessArray.some(value => secretArray.includes(value))
    }

    function makeGuess() {
        if (!secretDemon || !guess.trim() || gameWon) {
            return
        }

        const selectedDemon = demons.find(
            demon => demon.name.toLowerCase() === guess.trim().toLowerCase()
        )

        if (!selectedDemon) {
            alert('Demônio não encontrado.')
            return
        }

        const result = {
            demon: selectedDemon,

            race:
                selectedDemon.race === secretDemon.race
                    ? 'correct'
                    : 'wrong',

            level: compareValue(
                selectedDemon.level,
                secretDemon.level
            ),

            hp: compareValue(
                selectedDemon.hp,
                secretDemon.hp
            ),

            mp: compareValue(
                selectedDemon.mp,
                secretDemon.mp
            ),

            resistances: {
                reflect: hasCommonValue(
                    selectedDemon.resistances.reflect,
                    secretDemon.resistances.reflect
                ),

                absorb: hasCommonValue(
                    selectedDemon.resistances.absorb,
                    secretDemon.resistances.absorb
                ),

                void: hasCommonValue(
                    selectedDemon.resistances.void,
                    secretDemon.resistances.void
                ),

                resist: hasCommonValue(
                    selectedDemon.resistances.resist,
                    secretDemon.resistances.resist
                ),

                weak: hasCommonValue(
                    selectedDemon.resistances.weak,
                    secretDemon.resistances.weak
                )
            },

            skills: hasCommonValue(
                selectedDemon.skills,
                secretDemon.skills
            )
        }

        setGuesses(previous => [result, ...previous])
        setGuess('')

        if (selectedDemon.name === secretDemon.name) {
            confetes();
            setGameWon(true);
        }
    }

    function getColor(type) {
        if (type === 'correct') {
            return 'bg-green-500 text-white'
        }

        if (type === 'wrong') {
            return 'bg-red-500 text-white'
        }

        if (type === 'higher' || type === 'lower') {
            return 'bg-yellow-400 text-black'
        }
    }

    function getArrow(type) {
        if (type === 'higher') {
            return ' \u{1F53C}'
        }

        if (type === 'lower') {
            return ' \u{1F53D}'
        }

        return ''
    }

    // confetes quando o usuário acertar
    function confetes() {
    confetti({
        particleCount: 150,
        spread: 90,
        origin: {
            y: 0.6
        }
    })
}

    return (
        <main className="min-h-screen flex flex-col bg-zinc-900 p-8 text-white items-center">
            <div className="mx-auto max-w-6xl w-full flex-1">

                <span className="flex flex-row justify-center gap-3">
                    <img className="size-12" src="./src/assets/fav2.ico" alt="" />
                    <h1 className="text-center text-4xl font-bold">
                        Megaten Guesser
                    </h1>
                </span>

                <div className="m-6 flex justify-center gap-3">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            makeGuess()
                        }}
                    >
                        <input
                            type="text"
                            value={guess}
                            onChange={event => setGuess(event.target.value)}
                            placeholder="Insert demon name"
                            readOnly={gameWon}
                            className="w-80 rounded-lg px-4 py-3 text-white outline-none"
                        />

                        <button
                            type="submit"
                            readOnly={gameWon}
                            className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700 cursor-pointer"
                        >
                            Guess
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full border-collapse text-center">

                        <thead>
                            <tr className="bg-zinc-800">
                                <th className="p-3">Demônio</th>
                                <th className="p-3">Race</th>
                                <th className="p-3">Level</th>
                                <th className="p-3">HP</th>
                                <th className="p-3">MP</th>
                                <th className="p-3">Reflect</th>
                                <th className="p-3">Absorb</th>
                                <th className="p-3">Void</th>
                                <th className="p-3">Resist</th>
                                <th className="p-3">Weak</th>
                                <th className="p-3">Skills</th>
                            </tr>
                        </thead>

                        <tbody>
                            {guesses.map((result, index) => (
                                <tr key={result.demon.name}>

                                    <td className="flip-card border border-zinc-700 p-3" style={{animationDelay: '0ms'}}>
                                        {result.demon.name}
                                    </td>

                                    <td className={`flip-card border border-zinc-700 p-3 ${getColor(result.race)}`} style={{animationDelay: '100ms'}}>
                                        {result.demon.race}
                                    </td>

                                    <td className={`flip-card border border-zinc-700 p-3 ${getColor(result.level)}`} style={{animationDelay: '200ms'}}>
                                        {result.demon.level}
                                        {getArrow(result.level)}
                                    </td>

                                    <td className={`flip-card border border-zinc-700 p-3 ${getColor(result.hp)}`} style={{animationDelay: '300ms'}}>
                                        {result.demon.hp}
                                        {getArrow(result.hp)}
                                    </td>

                                    <td className={`flip-card border border-zinc-700 p-3 ${getColor(result.mp)}`} style={{animationDelay: '400ms'}}>
                                        {result.demon.mp}
                                        {getArrow(result.mp)}
                                    </td>

                                    <td
                                        className={`flip-card border border-zinc-700 p-3 ${
                                            result.demon.resistances.reflect.length === 0
                                                ? 'bg-zinc-500'
                                                : result.resistances.reflect
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{animationDelay: '500ms'}}
                                    >
                                        {result.demon.resistances.reflect.join(', ') || '-'}
                                    </td>

                                    <td
                                        className={`flip-card border border-zinc-700 p-3 ${
                                            result.demon.resistances.absorb.length === 0
                                                ? 'bg-zinc-500'
                                                : result.resistances.absorb
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{animationDelay: '600ms'}}
                                    >
                                        {result.demon.resistances.absorb.join(', ') || '-'}
                                    </td>

                                    <td
                                        className={`flip-card border border-zinc-700 p-3 ${
                                            result.demon.resistances.void.length === 0
                                                ? 'bg-zinc-500'
                                                : result.resistances.void
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{animationDelay: '700ms'}}
                                    >
                                        {result.demon.resistances.void.join(', ') || '-'}
                                    </td>

                                    <td
                                        className={`flip-card border border-zinc-700 p-3 ${
                                            result.demon.resistances.resist.length === 0
                                                ? 'bg-zinc-500'
                                                : result.resistances.resist
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{animationDelay: '800ms'}}
                                    >
                                        {result.demon.resistances.resist.join(', ') || '-'}
                                    </td>

                                    <td
                                        className={`flip-card border border-zinc-700 p-3 ${
                                            result.demon.resistances.weak.length === 0
                                                ? 'bg-zinc-500'
                                                : result.resistances.weak
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{animationDelay: '900ms'}}
                                    >
                                        {result.demon.resistances.weak.join(', ') || '-'}
                                    </td>

                                    <td className={`flip-card border border-zinc-700 p-3 ${result.skills ? 'bg-yellow-400 text-black' : 'bg-red-500'}`} style={{animationDelay: '1000ms'}}>
                                        {result.demon.skills.join(', ')}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
            {/* Rodapé */}
             <footer className="mt-8 text-center text-sm text-zinc-400">
                <a
                    href="https://github.com/AsebiCode/MegatenGuesser"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ion-icon
                        name="logo-github"
                        className="text-4xl"
                    ></ion-icon>
                </a>
          </footer>
        </main>
    )
}

export default App