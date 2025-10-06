import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'
import loadingIcon from './loading.gif'

const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        const about = response.data.about
        setAboutData(about)
      })
      .catch(err => {
        setError('Failed to load about data')
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    fetchAboutData()
  }, [])

  return (
    <>
      <h1>About Us</h1>
      {error && <p>{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading..." />}
      {loaded && aboutData && (
        <div>
          <h2>{aboutData.name}</h2>
          <img src={aboutData.imageUrl} alt={aboutData.name} />
          <p>{aboutData.bio}</p>
        </div>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default About