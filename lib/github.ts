const GITHUB_USERNAME = 'brunopompeu'

const EXCLUDED_REPOS = new Set(['portfolio'])

const HOMEPAGE_OVERRIDES: Record<string, string> = {
  'quiz-checkout': 'https://quiz-checkout-lyart.vercel.app/',
  'aprovacao-taxas-prototipo': 'https://negociacao-taxa-bo2.lovable.app/',
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  html_url: string
  homepage: string | null
  updated_at: string
  topics: string[]
  fork: boolean
}

const STATIC_PROJECTS: GithubRepo[] = [
  {
    id: 9999001,
    name: 'gastos-familia',
    description: 'Controle de gastos familiares com categorias, histórico e relatórios mensais.',
    language: 'TypeScript',
    stargazers_count: 0,
    html_url: 'https://github.com/brunopompeu/gastos-familia',
    homepage: null,
    updated_at: new Date().toISOString(),
    topics: [],
    fork: false,
  },
]

export async function getRepos(): Promise<GithubRepo[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    { headers, next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const repos: GithubRepo[] = await res.json()

  const filtered = repos
    .filter((r) => !r.fork && !EXCLUDED_REPOS.has(r.name))
    .map((r) => ({
      ...r,
      homepage: HOMEPAGE_OVERRIDES[r.name] ?? r.homepage,
    }))

  const apiNames = new Set(filtered.map((r) => r.name))
  const staticToAdd = STATIC_PROJECTS.filter((s) => !apiNames.has(s.name))

  return [...filtered, ...staticToAdd]
}
