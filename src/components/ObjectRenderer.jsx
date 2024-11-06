
import { Link } from 'react-router-dom';

const ObjectRenderer = ({ obj }) => {

  // const obj = { ...obj1 }

  const camelCaseToWords = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1') // Insert space before each uppercase letter
      .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
      .trim() // Remove any leading or trailing spaces
      .split(' ') // Split the string into an array of words
      .map(word => word.toLowerCase() === 'id' ? 'ID' : word) // Convert 'id' or 'Id' to 'ID'
      .join(' '); // Join the words back into a single string
  };

  return (
    <div>
      {Object.keys(obj).map(k => {
        const key = camelCaseToWords(k)
        const condition = typeof obj[k] === "object" || typeof obj[k] === "undefined" || obj[k] === null || k === "fcmToken"
        if (condition) return <></>
        if (k.endsWith("At")) return <div key={key}><b>{key}</b>: {new Date(obj[k]).toLocaleString()}</div>
        switch (k) {
          case "userId": return <div key={key}><b>{key}</b>: <Link to={"/User/" + obj[k]}>{obj[k]}</Link></div>
          case "astroId": return <div key={key}><b>{key}</b>: <Link to={"/Astro/" + obj[k]}>{obj[k]}</Link></div>
          default: return <div key={key}><b>{key}</b>: {obj[k]}</div>
        }
      }
      )}
    </div>
  )
}

export default ObjectRenderer