import { useQuery } from 'react-query'

import { fetchGistsByUser, fetchForksByUrl } from 'api/user'

export const useGists = value => {
  const data = useQuery('gistData', () => fetchGistsByUser(value), {
    enabled: value,
  })

  return data
}

export const useForksByGists = userGists => {
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

  return data
}
