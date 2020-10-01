export const fetchGistsByUser = user =>
  fetch(`https://api.github.com/users/${user}/gists`).then(res => res.json())

export const fetchForksByUrl = url => fetch(url).then(res => res.json())
