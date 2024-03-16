import { useState } from 'react';

import { mint } from './Web3Service';
import Recaptcha from 'react-google-recaptcha';

function App() {
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');

  function onBtnClick() {
    if (captcha) {
      setMessage('Requesting your tokens...wait...');
      mint()
        .then((tx) => setMessage('Your tokens were sent. Tx: ' + tx))
        .catch((err) =>
          setMessage(err.response ? err.response.data : err.message)
        );
      setCaptcha('');
    }
    setMessage("Check the 'I am not robot' box first.");
  }

  return (
    <>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">ProtoCoin faucet</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <a
                className="nav-link fw-bold py-1 px-0 active"
                aria-current="page"
                href="#"
              >
                Home
              </a>
              <a className="nav-link fw-bold py-1 px-0" href="#">
                About
              </a>
            </nav>
          </div>
        </header>

        <main className="px-3">
          <h1>Get you ProtoCoins</h1>
          <p className="lead">
            Once a day, earn a 10.000 coins for free just connecting your
            Metamask below.
          </p>
          <p className="lead">
            <a
              href="#"
              onClick={onBtnClick}
              className="btn btn-lg btn-light fw-bold border-white bg-white"
            >
              <img src="/assets/metamask.svg" alt="MetaMask logo" width={48} />
              Get tokens
            </a>
          </p>
          <div style={{ display: 'inline-flex' }}>
            <Recaptcha
              sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
              onChange={(value) => setCaptcha(value || '')}
            />
          </div>
          <p className="lead text-break">{message}</p>
        </main>

        <footer className="mt-auto text-white-50">
          <p>
            Built by{' '}
            <a
              href="https://github.com/mauriciotp"
              className="text-white"
              target="_blank"
              rel="noreferrer"
            >
              @mauriciotp
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
