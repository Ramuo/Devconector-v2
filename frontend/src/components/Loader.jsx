import spinner from '../img/spinner.gif'

const Loader = () => {
  return (
    <>
        <img 
        src={spinner} 
        alt="Loading..."
        style={{width: '200px', margin: 'auto', display: 'block'}} 
        />
    </>
  )
}

export default Loader;