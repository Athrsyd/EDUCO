import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Send, Sparkles, Trash2, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const EducoAI = ({ onClose }) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Saya EducoAI, asisten digital yang siap membantu Anda. Saya bisa menjawab pertanyaan umum, memberikan informasi cuaca, kualitas udara, event alam global (kebakaran hutan, banjir, badai), data iklim NASA, hingga tracking asteroid. Ada yang bisa saya bantu?',
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [conversationHistory, setConversationHistory] = useState([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // API Keys from environment variables
  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

  // Function calling utilities
  const callAPI = async (functionName, args) => {
    try {
      let url = ''
      
      // OpenWeather APIs
      switch(functionName) {
        case 'getCurrentWeather':
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(args.location)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`
          break
        case 'getWeatherForecast':
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(args.location)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=id`
          break
        case 'getAirPollution':
          url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${args.lat}&lon=${args.lon}&appid=${OPENWEATHER_API_KEY}`
          break
        case 'geocode':
          url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(args.q)}&limit=${args.limit || 5}&appid=${OPENWEATHER_API_KEY}`
          break
          
        // EONET APIs (NASA Natural Events)
        case 'getEONETEvents':
          url = `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=${args.limit || 20}`
          if (args.category) url += `&category=${args.category}`
          break
        case 'getEONETCategories':
          url = 'https://eonet.gsfc.nasa.gov/api/v3/categories'
          break
        case 'getEONETEventById':
          url = `https://eonet.gsfc.nasa.gov/api/v3/events/${args.eventId}`
          break
          
        // NASA POWER APIs
        case 'getNASAPowerDaily':
          const startDate = args.startDate || new Date().toISOString().split('T')[0].replace(/-/g, '')
          const endDate = args.endDate || new Date().toISOString().split('T')[0].replace(/-/g, '')
          url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${args.parameters || 'T2M,PRECTOTCORR,RH2M'}&community=AG&latitude=${args.latitude}&longitude=${args.longitude}&start=${startDate}&end=${endDate}&format=JSON`
          break
        case 'getNASAPowerClimatology':
          url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=${args.parameters || 'T2M,PRECTOTCORR'}&community=AG&latitude=${args.latitude}&longitude=${args.longitude}&format=JSON`
          break
          
        // NASA NeoWs API (Asteroids)
        case 'getNASAsteroids':
          const start = args.startDate || new Date().toISOString().split('T')[0]
          const end = args.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${NASA_API_KEY}`
          break
          
        default:
          return { error: 'Function not found' }
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API Error:', error)
      return { error: error.message }
    }
  }

  const functions = [
    {
      name: 'getCurrentWeather',
      description: 'Get current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name, e.g. Jakarta' }
        },
        required: ['location']
      }
    },
    {
      name: 'getWeatherForecast',
      description: 'Get 5-day weather forecast for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name, e.g. Bandung' }
        },
        required: ['location']
      }
    },
    {
      name: 'getAirPollution',
      description: 'Get air pollution data for coordinates',
      parameters: {
        type: 'object',
        properties: {
          lat: { type: 'number', description: 'Latitude' },
          lon: { type: 'number', description: 'Longitude' }
        },
        required: ['lat', 'lon']
      }
    },
    {
      name: 'geocode',
      description: 'Get coordinates for a location name',
      parameters: {
        type: 'object',
        properties: {
          q: { type: 'string', description: 'Location name' },
          limit: { type: 'number', description: 'Number of results' }
        },
        required: ['q']
      }
    },
    // EONET Functions
    {
      name: 'getEONETEvents',
      description: 'Get natural disaster events from NASA EONET (wildfires, floods, storms, volcanoes)',
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Event category: wildfires, floods, severeStorms, volcanoes' },
          limit: { type: 'number', description: 'Number of events (default 20)' }
        },
        required: []
      }
    },
    {
      name: 'getEONETCategories',
      description: 'Get all available natural event categories from EONET',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    },
    {
      name: 'getEONETEventById',
      description: 'Get details of a specific natural event by ID',
      parameters: {
        type: 'object',
        properties: {
          eventId: { type: 'string', description: 'Event ID, e.g. EONET_182' }
        },
        required: ['eventId']
      }
    },
    // NASA POWER Functions
    {
      name: 'getNASAPowerDaily',
      description: 'Get daily climate data from NASA POWER (temperature, precipitation, humidity, solar radiation)',
      parameters: {
        type: 'object',
        properties: {
          latitude: { type: 'number', description: 'Latitude coordinate' },
          longitude: { type: 'number', description: 'Longitude coordinate' },
          startDate: { type: 'string', description: 'Start date YYYYMMDD' },
          endDate: { type: 'string', description: 'End date YYYYMMDD' },
          parameters: { type: 'string', description: 'Parameters: T2M (temp), PRECTOTCORR (rain), RH2M (humidity), WS10M (wind), ALLSKY_SFC_SW_DWN (solar)' }
        },
        required: ['latitude', 'longitude']
      }
    },
    {
      name: 'getNASAPowerClimatology',
      description: 'Get 30-year climate averages from NASA POWER',
      parameters: {
        type: 'object',
        properties: {
          latitude: { type: 'number', description: 'Latitude coordinate' },
          longitude: { type: 'number', description: 'Longitude coordinate' },
          parameters: { type: 'string', description: 'Parameters to retrieve' }
        },
        required: ['latitude', 'longitude']
      }
    },
    // NASA NeoWs Function
    {
      name: 'getNASAsteroids',
      description: 'Get near-Earth objects (asteroids) passing by Earth within a date range',
      parameters: {
        type: 'object',
        properties: {
          startDate: { type: 'string', description: 'Start date YYYY-MM-DD' },
          endDate: { type: 'string', description: 'End date YYYY-MM-DD (max 7 days from start)' }
        },
        required: []
      }
    }
  ]

  const parseWeatherData = (data, type = 'current') => {
    if (data.error) return `Maaf, terjadi kesalahan: ${data.error}`
    
    if (type === 'current') {
      const weather = data.weather?.[0]
      const main = data.main
      const wind = data.wind
      
      if (!weather || !main) return 'Data cuaca tidak tersedia'
      
      return `🌤️ **Cuaca di ${data.name} saat ini:**

• Kondisi: ${weather.description}
• Suhu: ${Math.round(main.temp)}°C (terasa seperti ${Math.round(main.feels_like)}°C)
• Kelembaban: ${main.humidity}%
• Angin: ${Math.round(wind.speed * 3.6)} km/h ${wind.deg ? `dari arah ${wind.deg}°` : ''}
• Tekanan: ${main.pressure} hPa

${main.temp > 30 ? '🥵 Panas sekali! Jangan lupa minum air putih.' : 
  main.temp > 25 ? '😊 Cuaca cukup hangat.' : 
  main.temp > 20 ? '🌸 Cuaca nyaman.' : '🧥 Agak dingin, bawa jaket ya!'}`
    }
    
    if (type === 'pollution') {
      const aqi = data.list?.[0]?.main?.aqi
      const components = data.list?.[0]?.components
      
      if (!aqi) return 'Data kualitas udara tidak tersedia'
      
      const aqiText = {
        1: 'Sangat Baik',
        2: 'Baik',
        3: 'Sedang',
        4: 'Buruk',
        5: 'Sangat Buruk'
      }
      
      const aqiEmoji = {
        1: '✅',
        2: '😊',
        3: '⚠️',
        4: '😷',
        5: '🚨'
      }
      
      return `${aqiEmoji[aqi] || '⚠️'} **Kualitas Udara:**

• Indeks AQI: ${aqi} - ${aqiText[aqi] || 'Tidak diketahui'}
• PM2.5: ${components?.pm2_5?.toFixed(1) || '-'} μg/m³
• PM10: ${components?.pm10?.toFixed(1) || '-'} μg/m³
• O3 (Ozon): ${components?.o3?.toFixed(1) || '-'} μg/m³
• NO2: ${components?.no2?.toFixed(1) || '-'} μg/m³

${aqi <= 2 ? '✅ Udara bersih, aman untuk aktivitas outdoor.' : 
  aqi === 3 ? '⚠️ Udara cukup baik, tapi sensitif sebaiknya batasi aktivitas outdoor.' : 
  '😷 Udara buruk! Hindari aktivitas outdoor dan gunakan masker.'}`
    }
    
    return JSON.stringify(data)
  }

  const parseEONETData = (data, type = 'events') => {
    if (data.error) return `Maaf, terjadi kesalahan: ${data.error}`
    
    if (type === 'events') {
      const events = data.events || []
      if (events.length === 0) return 'Tidak ada event alam yang sedang aktif saat ini.'
      
      let response = `🌍 **Event Alam Aktif (${events.length} event):**\n\n`
      
      events.slice(0, 10).forEach((event, i) => {
        const category = event.categories?.[0]?.title || 'Unknown'
        const date = event.geometry?.[0]?.date || 'N/A'
        response += `${i + 1}. **${event.title}**\n`
        response += `   Kategori: ${category}\n`
        response += `   Tanggal: ${new Date(date).toLocaleDateString('id-ID')}\n\n`
      })
      
      if (events.length > 10) {
        response += `... dan ${events.length - 10} event lainnya.`
      }
      
      return response
    }
    
    if (type === 'categories') {
      const categories = data.categories || []
      let response = `📋 **Kategori Event Alam:**\n\n`
      
      categories.forEach(cat => {
        response += `• **${cat.title}** (${cat.id})\n`
      })
      
      return response
    }
    
    if (type === 'eventDetail') {
      const event = data
      let response = `📍 **Detail Event:**\n\n`
      response += `**${event.title}**\n\n`
      response += `Kategori: ${event.categories?.[0]?.title || 'N/A'}\n`
      response += `Status: ${event.status || 'N/A'}\n`
      
      if (event.geometry?.[0]?.coordinates) {
        const [lon, lat] = event.geometry[0].coordinates
        response += `Koordinat: ${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E\n`
      }
      
      response += `\n**Sumber:**\n`
      event.sources?.forEach(source => {
        response += `• [${source.name}](${source.url})\n`
      })
      
      return response
    }
    
    return JSON.stringify(data)
  }

  const parseNASAPowerData = (data, type = 'daily') => {
    if (data.error) return `Maaf, terjadi kesalahan: ${data.error}`
    
    if (type === 'daily') {
      const properties = data.properties?.parameter || {}
      const timeInfo = data.properties?.time || {}
      
      if (!properties.T2M && !properties.PRECTOTCORR) {
        return 'Data NASA POWER tidak tersedia untuk lokasi ini.'
      }
      
      const dates = Object.keys(properties.T2M || properties.PRECTOTCORR || {})
      const latest = dates[dates.length - 1]
      
      let response = `🌡️ **Data Iklim NASA POWER**\n\n`
      response += `Lokasi: ${data.properties?.latitude?.toFixed(2) || '-'}°N, ${data.properties?.longitude?.toFixed(2) || '-'}°E\n\n`
      
      if (latest && properties.T2M) {
        const temp = properties.T2M[latest]
        response += `📅 **${new Date(latest).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}**\n`
        response += `• Suhu: ${(temp * 9/5 - 459.67).toFixed(1)}°C\n` // Kelvin to Celsius
        
        if (properties.PRECTOTCORR) {
          const rain = properties.PRECTOTCORR[latest] * 86400 // kg/m²/s to mm/day
          response += `• Curah Hujan: ${rain.toFixed(1)} mm/hari\n`
        }
        
        if (properties.RH2M) {
          const humidity = properties.RH2M[latest]
          response += `• Kelembaban: ${humidity.toFixed(1)}%\n`
        }
        
        if (properties.WS10M) {
          const wind = properties.WS10M[latest]
          response += `• Angin: ${(wind * 3.6).toFixed(1)} km/h\n`
        }
        
        if (properties.ALLSKY_SFC_SW_DWN) {
          const solar = properties.ALLSKY_SFC_SW_DWN[latest]
          response += `• Radiasi Surya: ${solar.toFixed(1)} MJ/m²/hari\n`
        }
      }
      
      return response
    }
    
    if (type === 'climatology') {
      const properties = data.properties?.parameter || {}
      
      let response = `📊 **Rata-rata Iklim 30 Tahun (NASA POWER)**\n\n`
      response += `Lokasi: ${data.properties?.latitude?.toFixed(2) || '-'}°N, ${data.properties?.longitude?.toFixed(2) || '-'}°E\n\n`
      
      if (properties.T2M) {
        const avgTemp = Object.values(properties.T2M).reduce((a, b) => a + b, 0) / Object.values(properties.T2M).length
        response += `• Suhu Rata-rata: ${(avgTemp * 9/5 - 459.67).toFixed(1)}°C\n`
      }
      
      if (properties.PRECTOTCORR) {
        const avgRain = Object.values(properties.PRECTOTCORR).reduce((a, b) => a + b, 0) / Object.values(properties.PRECTOTCORR).length * 86400
        response += `• Curah Hujan Rata-rata: ${avgRain.toFixed(1)} mm/hari\n`
      }
      
      return response
    }
    
    return JSON.stringify(data)
  }

  const parseAsteroidData = (data) => {
    if (data.error) return `Maaf, terjadi kesalahan: ${data.error}`
    
    const nearEarthObjects = data.near_earth_objects || {}
    const allAsteroids = Object.values(nearEarthObjects).flat()
    
    if (allAsteroids.length === 0) {
      return '🌌 Tidak ada asteroid yang terdeteksi melewati Bumi pada periode ini.'
    }
    
    const hazardous = allAsteroids.filter(a => a.is_potentially_hazardous_asteroid)
    const safe = allAsteroids.filter(a => !a.is_potentially_hazardous_asteroid)
    
    let response = `☄️ **Asteroid Mendekati Bumi**\n\n`
    response += `Total terdeteksi: ${allAsteroids.length} asteroid\n`
    response += `⚠️ Berpotensi berbahaya: ${hazardous.length}\n`
    response += `✅ Aman: ${safe.length}\n\n`
    
    if (hazardous.length > 0) {
      response += `🚨 **Asteroid Berpotensi Berbahaya:**\n\n`
      hazardous.slice(0, 5).forEach((asteroid, i) => {
        const diameter = asteroid.estimated_diameter?.meters
        const minDiam = diameter?.estimated_diameter_min?.toFixed(0) || '?'
        const maxDiam = diameter?.estimated_diameter_max?.toFixed(0) || '?'
        const closeApproach = asteroid.close_approach_data?.[0]
        const missDistance = closeApproach?.miss_distance?.kilometers || '?'
        
        response += `${i + 1}. **${asteroid.name}**\n`
        response += `   Ukuran: ${minDiam} - ${maxDiam} meter\n`
        response += `   Jarak Terdekat: ${parseInt(missDistance).toLocaleString('id-ID')} km\n`
        response += `   Tanggal: ${closeApproach?.close_approach_date_full || 'N/A'}\n`
        response += `   Kecepatan: ${(parseFloat(closeApproach?.relative_velocity?.kilometers_per_hour || 0) / 3600).toFixed(1)} km/s\n\n`
      })
    }
    
    if (safe.length > 0 && hazardous.length < 5) {
      response += `\n**Asteroid Aman:**\n`
      safe.slice(0, 5 - hazardous.length).forEach((asteroid, i) => {
        const diameter = asteroid.estimated_diameter?.meters
        const minDiam = diameter?.estimated_diameter_min?.toFixed(0) || '?'
        response += `${i + 1}. ${asteroid.name} (${minDiam}m) - ${asteroid.close_approach_data?.[0]?.close_approach_date_full || 'N/A'}\n`
      })
    }
    
    response += `\n💡 *Data dari NASA NeoWs (Near Earth Object Web Service)*`
    
    return response
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response1 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `Anda adalah EducoAI, asisten virtual ramah untuk platform EDUCO. Anda membantu pengguna dengan:
- Pembelajaran lingkungan
- Informasi cuaca dan kualitas udara
- Event alam global (kebakaran hutan, banjir, badai, gunung berapi) dari NASA EONET
- Data iklim dari NASA POWER
- Tracking asteroid dari NASA NeoWs

PENTING:
- Gunakan function call untuk mengambil data real-time
- JANGAN PERNAH menampilkan tool call syntax atau raw JSON
- Jelaskan data dengan bahasa Indonesia santai, ramah, dan mudah dipahami
- Gunakan emoji untuk membuat respons menarik
- Untuk asteroid, jelaskan dengan cara yang tidak menakutkan tapi informatif`
            },
            ...conversationHistory,
            { role: 'user', content: userMessage.content }
          ],
          model: 'moonshotai/kimi-k2-instruct-0905',
          temperature: 0.6,
          max_completion_tokens: 2048,
          tools: functions.map(fn => ({ type: 'function', function: fn })),
          tool_choice: 'auto'
        })
      })

      const data1 = await response1.json()
      
      if (!data1.choices || !data1.choices[0] || !data1.choices[0].message) {
        throw new Error('Invalid response from AI')
      }

      const assistantMessage1 = data1.choices[0].message

      if (assistantMessage1.tool_calls && assistantMessage1.tool_calls.length > 0) {
        const newHistory = [
          ...conversationHistory,
          { role: 'user', content: userMessage.content },
          {
            role: 'assistant',
            content: null,
            tool_calls: assistantMessage1.tool_calls
          }
        ]

        const toolResults = []
        for (const toolCall of assistantMessage1.tool_calls) {
          const functionName = toolCall.function.name
          const args = JSON.parse(toolCall.function.arguments)
          
          setIsTyping(false)
          setTimeout(() => setIsTyping(true), 200)
          
          const result = await callAPI(functionName, args)
          
          let parsedResult = JSON.stringify(result)
          
          // Parse based on function type
          if (functionName === 'getCurrentWeather' || functionName === 'getWeatherForecast') {
            parsedResult = parseWeatherData(result, 'current')
          } else if (functionName === 'getAirPollution') {
            parsedResult = parseWeatherData(result, 'pollution')
          } else if (['getEONETEvents', 'getEONETCategories', 'getEONETEventById'].includes(functionName)) {
            parsedResult = parseEONETData(result, functionName === 'getEONETEvents' ? 'events' : functionName === 'getEONETCategories' ? 'categories' : 'eventDetail')
          } else if (functionName === 'getNASAPowerDaily') {
            parsedResult = parseNASAPowerData(result, 'daily')
          } else if (functionName === 'getNASAPowerClimatology') {
            parsedResult = parseNASAPowerData(result, 'climatology')
          } else if (functionName === 'getNASAsteroids') {
            parsedResult = parseAsteroidData(result)
          }
          
          toolResults.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: parsedResult
          })
        }

        newHistory.push(...toolResults)

        const response2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'Jelaskan hasil data dengan bahasa Indonesia yang santai, ramah, dan mudah dipahami. Gunakan emoji. JANGAN tampilkan data mentah JSON atau tool call syntax. Langsung berikan informasi dalam bentuk percakapan alami.'
              },
              ...newHistory
            ],
            model: 'moonshotai/kimi-k2-instruct-0905',
            temperature: 0.6,
            max_completion_tokens: 2048
          })
        })

        const data2 = await response2.json()
        const finalContent = data2.choices?.[0]?.message?.content || 'Maaf, saya mengalami kesalahan.'

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: finalContent,
          timestamp: new Date().toISOString()
        }])

        setConversationHistory(prev => [...newHistory.slice(-10)])
      } else {
        const content = assistantMessage1.content || 'Maaf, saya mengalami kesalahan.'
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: content,
          timestamp: new Date().toISOString()
        }])

        const newHistory = [
          ...conversationHistory,
          { role: 'user', content: userMessage.content },
          assistantMessage1
        ].slice(-10)
        setConversationHistory(newHistory)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.',
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Halo! Saya EducoAI, asisten digital yang siap membantu Anda. Saya bisa menjawab pertanyaan umum, memberikan informasi cuaca, kualitas udara, event alam global, data iklim NASA, hingga tracking asteroid. Ada yang bisa saya bantu?',
      timestamp: new Date().toISOString()
    }])
    setConversationHistory([])
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#F7F0F0] via-white to-[#E8F5E9] flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#48A111]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F2B50B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#25671E]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#48A111] via-[#25671E] to-[#48A111] bg-[length:200%_100%] animate-gradient shadow-lg animate-in slide-in-from-top duration-500">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: '200ms' }}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl tracking-tight animate-in fade-in duration-700" style={{ animationDelay: '400ms' }}>EducoAI</h2>
                  <p className="text-white/85 text-sm animate-in fade-in duration-700" style={{ animationDelay: '500ms' }}>Asisten Virtual EDUCO</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2.5 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
                title="Hapus percakapan"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '300ms' }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-3xl p-5 shadow-md transition-all duration-300 hover:shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#48A111] to-[#25671E] text-white rounded-br-lg'
                      : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.role === 'assistant' && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#48A111] to-[#25671E] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm md:text-base leading-relaxed break-words ${
                        message.role === 'user' ? 'text-white' : 'text-gray-800'
                      }`}>
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            strong: ({node, ...props}) => <span className="font-bold" {...props} />,
                            em: ({node, ...props}) => <span className="italic" {...props} />,
                            code: ({node, inline, ...props}) => (
                              inline 
                                ? <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-[#48A111]" {...props} />
                                : <code className="block bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
                            ),
                            pre: ({node, ...props}) => <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto my-2" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="ml-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-base font-bold my-2" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#48A111] pl-4 italic my-2" {...props} />,
                            hr: ({node, ...props}) => <hr className="my-3 border-gray-300" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white shadow-md rounded-3xl rounded-bl-lg p-5 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#48A111] to-[#25671E] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#48A111] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#48A111] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#48A111] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '500ms' }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="tanya EducoAI"
                className="w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-[#48A111] focus:border-transparent text-sm md:text-base transition-all duration-200 shadow-sm hover:shadow-md"
                rows="1"
                style={{ minHeight: '56px', maxHeight: '140px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="p-4 rounded-2xl bg-gradient-to-r from-[#48A111] to-[#25671E] text-white hover:from-[#25671E] hover:to-[#48A111] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
            <p className="text-xs text-gray-500">
              Tekan Enter untuk mengirim • EducoAI dapat membuat kesalahan
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span>🌤️</span> Cuaca</span>
              <span className="flex items-center gap-1"><span>🌋</span> Event Alam</span>
              <span className="flex items-center gap-1"><span>📊</span> Iklim NASA</span>
              <span className="flex items-center gap-1"><span>☄️</span> Asteroid</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default EducoAI
