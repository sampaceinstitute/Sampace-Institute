import { useEffect } from 'react'

export default function SEOHelmet({ title, description, url }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title
    }

    // 2. Update Meta Description
    const setMeta = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        if (name.startsWith('og:')) {
          element.setAttribute('property', name)
        } else {
          element.setAttribute('name', name)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    if (description) {
      setMeta('description', description)
      setMeta('og:description', description)
    }
    if (title) {
      setMeta('og:title', title)
      setMeta('twitter:title', title)
    }
    if (url) {
      setMeta('og:url', url)
    }

    // 3. Standard OG Tags
    setMeta('og:type', 'website')
    setMeta('og:site_name', 'SAMPACE Educational Ltd')
    setMeta('og:image', 'https://sampaceedu.com.ng/logo.png') // Replace with your actual logo URL later
    
  }, [title, description, url])

  return null
}
