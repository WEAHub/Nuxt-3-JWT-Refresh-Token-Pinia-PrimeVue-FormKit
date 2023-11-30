type $Fetch = typeof globalThis.$fetch
type $FetchParams = Parameters<$Fetch>
type $FetchUrl = $FetchParams[0]
type $FetchOptions = $FetchParams[1]
type $FetchReturnType = ReturnType<$Fetch>

export interface Configuration {
  refreshToken: (fetch: $Fetch) => Promise<void>
  shouldRefreshToken: (url: $FetchUrl) => boolean
  fetch: $Fetch
}

export function configureRefreshFetch(config: Configuration): $Fetch {

  const { refreshToken, shouldRefreshToken, fetch } = config

  function wrappedFetch(url: $FetchUrl, options: $FetchOptions): $FetchReturnType {

    const expiredToken = shouldRefreshToken(url);

    if(expiredToken) {
      return new Promise((resolve, reject) => 
        refreshToken(fetch)
          .then(resolve)
          .catch(error => reject(error))
      )
      .then(() => fetch(url, options))
      .catch(error => { throw error })
    }

    return fetch(url, options)
  }

  wrappedFetch.raw = fetch.raw
  wrappedFetch.create = fetch.create

  return wrappedFetch as $Fetch
}