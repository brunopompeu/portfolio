import { GithubRepo } from '@/lib/github'

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

function formatName(name: string): string {
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  })
}

export default function ProjectCard({ repo }: { repo: GithubRepo }) {
  return (
    <article className="border border-zinc-900 rounded-lg p-5 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-white mb-1">{formatName(repo.name)}</h2>
          {repo.description && (
            <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
              {repo.description}
            </p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            {repo.language && (
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#666' }}
                />
                {repo.language}
              </span>
            )}
            <span className="text-xs text-zinc-700">{formatDate(repo.updated_at)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded transition-colors"
            >
              Demo →
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}
