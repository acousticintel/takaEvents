import Image from "next/image";
import Router from "next/router";
import {
  getProviders,
  signIn as SignInProvider,
  useSession,
} from "next-auth/react";
import { useEffect } from "react";

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default function SignIn({ providers }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      //auth is initialized and there is no user
      if (session) {
        // redirect
        Router.replace("/profile");
      }
    }
  }, [status, Router, session]);

  return (
    <div className="signIn-page">
      <div className="flex flex-col h-full justify-start items-center">
        <div className="h-40 w-28 mt-10 rounded-lg overflow-hidden relative">
          <Image
            src="/assets/logo.png"
            alt="Taka"
            layout="fill"
            blurDataURL="/assets/loading.svg"
          />
        </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() =>
                  SignInProvider(provider.id, { callbackUrl: "/profile" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
