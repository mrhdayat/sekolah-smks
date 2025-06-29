import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useViewTransition = () => {
  const navigate = useNavigate()

  const startTransition = useCallback((to: string) => {
    if ('startViewTransition' in document) {
      // @ts-ignore - View Transitions API might not be in types yet
      document.startViewTransition(() => {
        navigate(to)
      })
    } else {
      navigate(to)
    }
  }, [navigate])

  const startTransitionCallback = useCallback((callback: () => void) => {
    if ('startViewTransition' in document) {
      // @ts-ignore - View Transitions API might not be in types yet
      document.startViewTransition(callback)
    } else {
      callback()
    }
  }, [])

  return { startTransition, startTransitionCallback }
}