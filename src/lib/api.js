export async function fetchWithAuth(endpoint, options = {}) {
    // Get token from both localStorage and cookies for consistency
    const token = localStorage.getItem('token') || document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]
  
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Merge default headers with provided options
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    }
  
    try {
      // Make the API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers,
      })
    
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token')
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          window.location.href = '/login'
          throw new Error('Session expired')
        }
        
        const errorData = await response.json()
        throw new Error(errorData.message || 'API call failed')
      }
    
      return response.json()
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError') {
        throw new Error('Network error - please check your connection')
      }
      throw error
    }
}