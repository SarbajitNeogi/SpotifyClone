import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import github from '../public/github.svg';
import linkedin from '../public/linkedin.png';
import twitter from '../public/twitter.png';

function Login({ providers }) {
  return (
    <div
      className="text-center h-screen w-screen flex items-center justify-center relative"
      style={{ backgroundColor: 'whitesmoke' }}
    >
      <div className="bg-black w-screen h-40 flex flex-col items-center justify-center relative min-h-screen ">
        <img
          className="w-16 md-20 lg:w-24 bg-white rounded-full mr-7 md:mr-12 "
          src="https://links.papareact.com/9xl"
          alt="spotify logo"
        />
        <h1
          className="text-4xl lg:text-9xl md:text-7xl  uppercase font-bold"
          style={{
            color: '#1ed760',
          }}
        >
          spotify
        </h1>
        {/* <small className="flex absolute top-[6.5rem] right-[30rem] font-extrabold uppercase text-lg text-white  lg:block">
          Clone
        </small> */}

        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="absolute top-auto w-20 h-20 bg-transparent right-10 cursor-pointer"
          >
            <ChevronDoubleRightIcon
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="w-20 h-20 animate-pulse"
              style={{ color: '#1ed760' }}
            />
          </div>
        ))}
      </div>
      <footer
        className="absolute bottom-0 w-96 h-16 bg-gray-300 rounded-t-md"
        style={{
          textAlign: 'center',
          display: 'flex',
          marginTop: '1rem',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <a
          href="https://github.com/SarbajitNeogi"
          target="_blank noreferrer"
        >
          <Image src={github} alt="github" height={40} width={40} />
        </a>
        <a href="https://www.twitter.com" target="_blank noreferrer">
          <Image
            src={twitter}
            alt="twitter"
            height={40}
            width={40}
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank noreferrer"
        >
          <Image
            src={linkedin}
            alt="linkedin"
            height={40}
            width={40}
          />
        </a>
      </footer>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}