import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const NotFound = ({item}) => {
  const navigate = useNavigate();
  return (
    <main className='flex flex-col items-center sm:pb-20' >
        <h1>Oooops!</h1>
        <h3>Something went wrong!</h3>
        <h3><strong>Error 404 </strong>- {item} not found</h3>
        <Link to='/' className='mt-4'>
          <Button text="Go back" press={()=>navigate(-1)}/>
        </Link>
    </main>
  )
}

export default NotFound