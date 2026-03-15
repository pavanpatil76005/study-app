import { useState, useEffect, useRef } from 'react'

const PRESETS = [
  { label: 'Focus', minutes: 25 },
  { label: 'Short break', minutes: 5 },
  { label: 'Long break', minutes: 15 },
]

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [presetIndex, setPresetIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const total = PRESETS[presetIndex].minutes * 60

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const start = () => {
    if (secondsLeft === 0) setSecondsLeft(total)
    setRunning(true)
  }

  const reset = () => {
    setRunning(false)
    setSecondsLeft(total)
  }

  const selectPreset = (i: number) => {
    setPresetIndex(i)
    setRunning(false)
    setSecondsLeft(PRESETS[i].minutes * 60)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Focus Timer</h1>

      <div className="flex gap-2 mb-6">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => selectPreset(i)}
            className={`px-4 py-2 rounded-lg font-medium ${
              presetIndex === i
                ? 'bg-brand-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {p.label} ({p.minutes}m)
          </button>
        ))}
      </div>

      <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200">
        <p className="text-6xl font-mono font-bold text-slate-800 tabular-nums">
          {formatTime(secondsLeft)}
        </p>
        <p className="text-slate-500 mt-2">{PRESETS[presetIndex].label}</p>
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={running ? reset : start}
            className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700"
          >
            {running ? 'Reset' : 'Start'}
          </button>
          {running && (
            <button
              type="button"
              onClick={() => setRunning(false)}
              className="px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50"
            >
              Pause
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
