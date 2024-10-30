import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
          
            <header className='head-line'>
                <h1>Welcome to <span className="nowrap">John Doe!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Doe City, John Doe provides a trained staff ready to meet your tech repair needs.</p>
                <br />
                <p>We offer a wide range of services including:</p>
                <ul className="public-detail">
                    <li>Computer Repair</li>
                    <li>Mobile Device Repair</li>
                    <li>Data Recovery</li>
                    <li>Software Installation</li>
                    <li>Network Setup</li>
                </ul>
                <p>Come visit us today, or give us a call for a free consultation. <br/>(555) 555-5555</p>
              
                
            </main>
            <footer className='foot-line'>
                <Link to="/login">
                <div className="employee-login">
                Employee Login
                </div>
                </Link>
                <p className="Owner-john">Owner: John Doe</p>
            </footer>
        
        </section>
    );

    return content;
}

export default Public;
