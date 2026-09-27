export default async (req) => {
  const url = new URL(req.url)
  const cockpitPath = url.searchParams.get('path')

  const response = await fetch(`https://ursula-cockpit.rf.gd/api${cockpitPath}`, {
    headers: {
      'api-key': process.env.COCKPIT_TOKEN,
      accept: 'application/json',
    },
  })

  const data = await response.text()

  return new Response(data, {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
