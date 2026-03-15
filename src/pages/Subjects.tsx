import { Link } from 'react-router-dom'
import { useSubjectsContext } from '../store/SubjectsContext'

export default function Subjects() {
  const { subjects, loadDefaultSubjects } = useSubjectsContext()

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Engineering Study Material
      </h1>
      <p className="text-slate-600 mb-6">
        Subjects with YouTube classes and links. Click a subject to see videos and add more.
      </p>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={loadDefaultSubjects}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
        >
          Load all default subjects &amp; links
        </button>
        <span className="text-slate-500 text-sm">
          Adds 11 subjects with all YouTube playlists (Math, Physics, Programming, DSA, DBMS, CN, OS, COA, TOC, Compiler, Web).
        </span>
      </div>
      <ul className="space-y-4">
        {subjects.map((subject) => (
          <li key={subject.id}>
            <Link
              to={`/subjects/${subject.id}`}
              className="block p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-slate-800">
                {subject.name}
              </h2>
              {subject.description && (
                <p className="text-slate-600 text-sm mt-1">{subject.description}</p>
              )}
              <p className="text-brand-600 text-sm mt-2">
                {subject.resources.length} video
                {subject.resources.length !== 1 ? 's' : ''} / link
                {subject.resources.length !== 1 ? 's' : ''}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
