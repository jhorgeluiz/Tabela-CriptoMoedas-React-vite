import { BsFillCaretDownFill, BsCaretUpFill} from "react-icons/bs"
import { useState, useEffect } from 'react'
import './App.css'
import './App.css'

function App() {
  const [moeda, setmoeda] = useState([])
  const [valor, setvalor] = useState([])
  const [ordemcrescente, setordemcrescente] = useState(true)

  const campo = (event) => {
    setvalor(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi()
      setmoeda(data)
    }
    fetchData()
  })

  const ordem = () => {
    setordemcrescente(!ordemcrescente)
  }

  const ordemoedas = moeda
  .filter((moeda) =>  moeda.name.includes(valor) || moeda.symbol.includes(valor))


  .sort((a, b) => {
    if (ordemcrescente) {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  })

  
  const fetchApi = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
    const data = await res.json()
    return data
  }
  return (
    <>
      <header>
        <h1>Tabela de Cripotomoedas</h1>
      
        <div className='container_input'>
          <input className='input' type="text" value={valor} onChange={campo} />
        </div>
        
      </header>
      <main>
        <table>
          <tr>
            <th scope="col">Criptomoedas</th>
            <th scope="col">Preço (USD)</th>
            <th scope="col"><button onClick={ordem}>Variação 24h (%) {ordemcrescente ? <BsCaretUpFill />  : <BsFillCaretDownFill /> } </button></th>
          </tr>
        
          
          {ordemoedas.map((moeda) => (
            <tr key={moeda.id}>
              <td><img src={moeda.image} alt={"icone_moeda"} width={15}/>{moeda.name}({moeda.symbol})</td>

              <td>$ {moeda.current_price.toFixed(2)}</td>

              <td style={{color: moeda.price_change_percentage_24h < 0 ? 'red' : 'Lime'}}>{moeda.price_change_percentage_24h.toFixed(2)}%</td>
              
            </tr>
          ))}
        
        </table>
      </main>
    </>
  )
}

export default App;