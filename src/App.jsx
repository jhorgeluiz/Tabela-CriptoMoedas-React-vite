import './App.css'

function App() {

  return (
    <>
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