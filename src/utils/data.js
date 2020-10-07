import { format } from 'date-fns'

export const formatGists = data => {
  if (Array.isArray(data))
    return data?.map(g =>
      Object.entries(g.files).map(f => {
        return {
          id: g.id,
          html_url: g['html_url'],
          description: g.description,
          created_at: format(new Date(g['created_at']), 'LLL d yyyy'),
          owner: g.owner,
          ...f[1],
        }
      }),
    )
}

export const formatGistsWithForks = (gists, forks) => {
  const formattedGists = formatGists(gists)

  if (formattedGists && forks)
    return formattedGists?.map((g, index) =>
      g.map(f => {
        return { ...f, forks: forks[index] }
      }),
    )
}
