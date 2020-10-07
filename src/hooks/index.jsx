import { useQuery } from 'react-query'

import { fetchGistsByUser, fetchForksByUrl } from 'api/user'
import { formatGistsWithForks } from 'utils/data'

export const useGists = value => {
  const data = useQuery('gistData', () => fetchGistsByUser(value), {
    enabled: false,
  })

  return data
}

export const useGistsWithForks = userGists => {
  const data = useQuery(
    'forkData',
    () =>
      userGists &&
      Promise.all(
        userGists?.map(g => fetchForksByUrl(g['forks_url']), {
          enabled: userGists,
        }),
      ),
  )

  return { data: formatGistsWithForks(userGists, data), refetch: data.refetch }
}
