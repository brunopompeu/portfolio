import { getRepos } from '@/lib/github'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 3600

export default async function Home() {
  const repos = await getRepos()

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <header className="mb-16">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Bruno Pompeu
          </h1>
          <p className="text-zinc-500 mb-6">
            Projetos construídos com IA
          </p>
          <a
            href="https://github.com/brunopompeu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            github.com/brunopompeu ↗
          </a>
        </header>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs text-zinc-600 uppercase tracking-widest">Projetos</h2>
            <span className="text-xs text-zinc-700">{repos.length} repositórios</span>
          </div>
          <div className="flex flex-col gap-3">
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-zinc-900">
          <p className="text-xs text-zinc-700">
            Dados via GitHub API · atualiza a cada hora
          </p>
        </footer>

      </div>
    </main>
  )
}
