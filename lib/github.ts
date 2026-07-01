const GITHUB_USERNAME = 'brunopompeu'

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
  return repos.filter((r) => !r.fork)
}
