import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>WORKOUT VAULT</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;