import Link from "next/link";

export const LoginForm = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center pt-16">
      <div className="w-11/12 max-w-sm mx-auto">
        <form 
          action="https://httpbin.org/post" 
          method="POST" 
          className="grid gap-4 bg-blue-600 pr-8 dark:bg-gray-900 p-8 rounded-md shadow-lg"
        >
          {/* Header Text */}
          <h2 className="text-center text-2xl font-bold text-white dark:text-gray-300 mb-6">
            Inicia Sesión
          </h2>

          {/* Username Field */}
          <div className="flex items-center bg-white dark:bg-gray-700 rounded-md">
            <label htmlFor="login__email" className="p-4">
              <svg className="w-5 h-5 fill-current text-gray-400">
                <use xlinkHref="#icon-user" />
              </svg>
            </label>
            <input
              autoComplete="email"
              id="login__email"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
              className="w-full p-4 bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-white dark:bg-gray-700 rounded-md">
            <label htmlFor="login__password" className="p-4">
              <svg className="w-5 h-5 fill-current text-gray-400">
                <use xlinkHref="#icon-lock" />
              </svg>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              className="w-full p-4 bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Ingresar"
              className="w-full p-4 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md cursor-pointer transition"
            />
          </div>
        </form>

        {/* Footer Text */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          ¿Eres nuevo? <Link href="/signIn" className="text-blue-600 underline">Regístrate</Link>
          <svg className="w-4 h-4 inline-block ml-1 fill-current text-blue-600">
            <use xlinkHref="#icon-arrow-right" />
          </svg>
        </p>
      </div>

      {/* SVG Icons */}
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
        </symbol>
        <symbol id="icon-lock" viewBox="0 0 1792 1792">
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 1792 1792">
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </symbol>
      </svg>
    </div>
  );
};
