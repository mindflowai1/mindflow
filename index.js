/**
 * MindFlow Landing Page Worker
 * Handles requests and serves static assets for the MindFlow landing page
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Serve static assets from the site bucket
  return fetch(request)
}
