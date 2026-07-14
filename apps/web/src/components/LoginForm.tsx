export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400/80">
      <div className="w-full max-w-md p-8 bg-teal-600 shadow-2xl rounded-xl">
        <h2 className="mb-8 text-2xl font-bold text-white">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 mt-6 font-bold text-white transition-colors bg-teal-800 rounded-md cursor-pointer hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-teal-100">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-white underline transition-colors cursor-pointer hover:text-teal-200"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
