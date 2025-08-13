import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#25803fff' }}>
      <div>
        <div >
          <Link to='/' >
            <h1>Project Earth Health</h1>
          </Link>
        </div>

        <nav>
          <Link
            to='/cleanups'
          >
            Cleanups
          </Link>
          <Link
            to='/cleanups/new'
          >
            + New Cleanup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
