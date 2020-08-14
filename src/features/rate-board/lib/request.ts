type Method = 'get'
type RequestAttr = {
  method: Method
  path: string
}
type GetAttr = Omit<RequestAttr, 'method'>
type GetRequest = <T>({ path }: GetAttr) => Promise<T>
type Request = <T>({ method, path }: RequestAttr) => Promise<T>

/**
 * make request
 * @param {string} method request method
 * @param {string} path request url
 * @returns {Promise<T>} response
 */
const request: Request = async ({ method, path }) => {
  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: new Headers({
      authorization: `Apikey ${process.env.API_KEY}`,
    }),
  }
  const url = new URL(path, process.env.API_URL)

  const response = await fetch(url.href, options)

  return response.json()
}

/**
 * make get request
 * @param {string} path request url
 * @returns {Promise<T>} response
 */
export const get: GetRequest = ({ path }) => request({ method: 'get', path })
