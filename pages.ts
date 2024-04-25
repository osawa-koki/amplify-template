interface Page {
  emoji: string
  path: string
  name: string
}

const pages: Page[] = [
  {
    emoji: '🏠',
    path: '/',
    name: 'Home'
  },
  {
    emoji: '📝',
    path: '/auth/',
    name: 'Auth'
  },
  {
    emoji: '📦',
    path: '/api/',
    name: 'Api'
  },
  {
    emoji: '📚',
    path: '/storage/',
    name: 'Storage'
  }
]

export default pages
