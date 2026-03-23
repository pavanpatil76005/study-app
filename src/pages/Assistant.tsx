import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are a helpful study assistant for engineering students. You help with concepts in mathematics, physics, programming, data structures, databases, and other engineering subjects. Explain clearly, use examples when useful, and keep answers focused. If the student is stuck on a problem, guide them step by step without giving away the full answer unless they ask.`

const OPENAI_KEY_STORAGE = 'study-app-openai-api-key'
const GROQ_KEY_STORAGE = 'study-app-groq-api-key'
const PROVIDER_STORAGE = 'study-app-ai-provider'

type Provider = 'free' | 'openai' | 'groq'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function getStoredKey(provider: Provider): string {
  try {
    const key = provider === 'groq' ? localStorage.getItem(GROQ_KEY_STORAGE) : localStorage.getItem(OPENAI_KEY_STORAGE)
    return key ?? ''
  } catch {
    return ''
  }
}

function getOpenApiKey(): string {
  const stored = getStoredKey('openai')
  if (stored) return stored
  return import.meta.env.VITE_OPENAI_API_KEY ?? ''
}

function getProvider(): Provider {
  try {
    const p = localStorage.getItem(PROVIDER_STORAGE)
    if (p === 'groq' || p === 'openai') return p
    return 'free'
  } catch {
    return 'free'
  }
}

const GROQ_MODEL = 'llama-3.3-70b-versatile'
const OPENAI_MODEL = 'gpt-4o-mini'

async function callFreeApi(userText: string, prevMessages: Message[]): Promise<string> {
  const context = [SYSTEM_PROMPT, ...prevMessages.slice(-4).map((m) => `${m.role}: ${m.content}`), `User: ${userText}`].join('\n\n')
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 55000)

  try {
    const url = `https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/chat/?query=${encodeURIComponent(context)}`
    const res = await fetch(url, { method: 'GET', signal: controller.signal })
    clearTimeout(timeoutId)
    const raw = await res.text()
    if (!res.ok) throw new Error(raw || res.statusText)
    try {
      const j = JSON.parse(raw)
      return j.response ?? j.message ?? j.content ?? j.reply ?? j.text ?? raw
    } catch {
      return raw || 'No response.'
    }
  } catch {
    clearTimeout(timeoutId)
    const c2 = new AbortController()
    const t2 = setTimeout(() => c2.abort(), 55000)
    try {
      const res2 = await fetch('https://free-ai-api-z7vq.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: context, model: 'gpt-4o-mini' }),
        signal: c2.signal,
      })
      clearTimeout(t2)
      const data = await res2.json().catch(() => ({}))
      const out = data?.response ?? data?.message ?? data?.content ?? data?.reply
      if (out) return out
    } catch {
      clearTimeout(t2)
    }
    throw new Error('Free AI server is busy or unavailable. Try again in a minute or use "Groq (free key)" below.')
  }
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [provider, setProviderState] = useState<Provider>(getProvider)
  const [openaiKeyInput, setOpenaiKeyInput] = useState(() => getStoredKey('openai'))
  const [groqKeyInput, setGroqKeyInput] = useState(() => getStoredKey('groq'))
  const [showKeyInput, setShowKeyInput] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const openaiKey = getOpenApiKey()
  const groqKey = getStoredKey('groq')
  const hasOpenaiKey = openaiKey.length > 0
  const hasGroqKey = groqKey.length > 0

  const setProvider = (p: Provider) => {
    setProviderState(p)
    localStorage.setItem(PROVIDER_STORAGE, p)
    setError(null)
  }

  const saveKeys = () => {
    localStorage.setItem(OPENAI_KEY_STORAGE, openaiKeyInput.trim())
    localStorage.setItem(GROQ_KEY_STORAGE, groqKeyInput.trim())
    setShowKeyInput(false)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    if (provider !== 'free') {
      const keyToUse = provider === 'groq' ? (groqKeyInput.trim() || groqKey) : (openaiKeyInput.trim() || openaiKey)
      if (!keyToUse) {
        setError(provider === 'groq' ? 'Please add your Groq API key below (free at console.groq.com).' : 'Please add your OpenAI API key below.')
        setShowKeyInput(true)
        return
      }
    }

    setError(null)
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      let content: string

      if (provider === 'free') {
        content = await callFreeApi(text, messages)
      } else {
        const keyToUse = provider === 'groq' ? (groqKeyInput.trim() || groqKey) : (openaiKeyInput.trim() || openaiKey)
        const url = provider === 'groq'
          ? 'https://api.groq.com/openai/v1/chat/completions'
          : 'https://api.openai.com/v1/chat/completions'
        const model = provider === 'groq' ? GROQ_MODEL : OPENAI_MODEL
        const body = {
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          max_tokens: 1024,
        }
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${keyToUse}`,
          },
          body: JSON.stringify(body),
        })
        const data = await response.json().catch(() => ({}))
        const errMsg = data?.error?.message
        if (!response.ok) {
          if (response.status === 401) {
            setError(provider === 'groq'
              ? 'Invalid Groq API key. Get a free key at console.groq.com and paste it below.'
              : 'Invalid API key. Check your key at https://platform.openai.com/api-keys and paste it below.')
            setShowKeyInput(true)
          } else if (response.status === 429) {
            setError('Rate limit exceeded. Switch to "Free (no key)" or "Groq (free)" below.')
            setShowKeyInput(true)
          } else {
            setError(errMsg || response.statusText || 'Request failed. Check your connection and API key.')
          }
          return
        }
        content = data.choices?.[0]?.message?.content ?? 'No response.'
        if (provider === 'groq' && keyToUse !== getStoredKey('groq')) {
          localStorage.setItem(GROQ_KEY_STORAGE, keyToUse)
          setGroqKeyInput(keyToUse)
        }
        if (provider === 'openai' && keyToUse !== getStoredKey('openai')) {
          localStorage.setItem(OPENAI_KEY_STORAGE, keyToUse)
          setOpenaiKeyInput(keyToUse)
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: content! },
      ])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.'
      setError(
        msg.includes('fetch') || msg.includes('Network')
          ? 'Network error. Check your internet and try again.'
          : msg
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px]">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Study Assistant</h1>
      <p className="text-slate-600 mb-4">
        Ask questions about engineering subjects—math, programming, DSA, and more.
      </p>

      <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-slate-700 font-medium">AI provider</span>
          <div className="flex gap-3 flex-wrap">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="provider"
                checked={provider === 'free'}
                onChange={() => setProvider('free')}
              />
              Free (no key)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="provider"
                checked={provider === 'groq'}
                onChange={() => setProvider('groq')}
              />
              Groq (free key)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="provider"
                checked={provider === 'openai'}
                onChange={() => setProvider('openai')}
              />
              OpenAI
            </label>
          </div>
        </div>
        <p className="text-slate-600 text-xs">
          {provider === 'free' && 'No sign-up. Uses a free public API; first reply may take 30–60 seconds.'}
          {provider === 'groq' && 'Free tier—get a key at console.groq.com (no credit card).'}
          {provider === 'openai' && 'Paid / limited free tier. Use Free or Groq if you hit quota errors.'}
        </p>
        {provider !== 'free' && (
          <>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-slate-700">
            {provider === 'groq' ? (hasGroqKey ? 'Groq key set.' : 'Add Groq API key (free).') : (hasOpenaiKey ? 'OpenAI key set.' : 'Add OpenAI API key.')}
          </span>
          <button
            type="button"
            onClick={() => setShowKeyInput((s) => !s)}
            className="text-brand-600 font-medium hover:underline"
          >
            {showKeyInput ? 'Hide keys' : 'Paste / change key'}
          </button>
        </div>
        {showKeyInput && (
          <div className="mt-3 space-y-2">
            {provider === 'openai' && (
              <div className="flex gap-2 flex-wrap items-center">
                <input
                  type="password"
                  value={openaiKeyInput}
                  onChange={(e) => setOpenaiKeyInput(e.target.value)}
                  placeholder="sk-... (OpenAI API key)"
                  className="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  autoComplete="off"
                />
              </div>
            )}
            {provider === 'groq' && (
              <div className="flex gap-2 flex-wrap items-center">
                <input
                  type="password"
                  value={groqKeyInput}
                  onChange={(e) => setGroqKeyInput(e.target.value)}
                  placeholder="gsk_... (Groq API key - free at console.groq.com)"
                  className="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  autoComplete="off"
                />
              </div>
            )}
            <button
              type="button"
              onClick={saveKeys}
              className="px-3 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium"
            >
              Save key
            </button>
          </div>
        )}
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 space-y-4 min-h-0">
        {messages.length === 0 && !loading && (
          <p className="text-slate-500 text-center py-8">
            Send a message to start. e.g. &quot;Explain binary search&quot; or &quot;Help with this integration problem&quot;
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                m.role === 'user'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg px-4 py-2 text-slate-500">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="mt-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}
