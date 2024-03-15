import {Link} from 'react-router-dom';

export const Header = () => {
    return (
      <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-center p-3'>
        <ul className='flex gap-4'>
          <Link to='/locations'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Locations
            </li>
          </Link>
          <Link to='/cabs'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Cabs
            </li>
          </Link>
          <Link to='/sign-in'>
            <li className=' text-slate-700 hover:underline'> Sign in</li>
          </Link>

        </ul>
      </div>
      </header>

  );
  
}
