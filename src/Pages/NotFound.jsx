import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-last px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />

      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col justify-center gap-8 rounded-4xl border border-secondary/10 bg-white/85 p-8 shadow-2xl shadow-secondary/10 backdrop-blur-sm md:p-14">
        <span className="inline-flex w-fit rounded-full bg-accent px-4 py-2 text-xs font-semibold tracking-[0.2em] text-last">
          ERROR 404
        </span>

        <div className="space-y-5">
          <h1 className="font-bold text-5xl leading-none text-secondary sm:text-6xl md:text-8xl">
            Halaman Tidak
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ditemukan
            </span>
          </h1>

          <p className="max-w-2xl text-sm font-medium leading-relaxed text-secondary/85 md:text-lg">
            Sepertinya kamu nyasar ke rute yang belum tersedia. Yuk kembali ke halaman utama untuk melanjutkan perjalanan belajar bersama EDUCO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-xl md:text-base"
          >
            Kembali ke Landing Page
          </Link>

          <Link
            to="/login"
            className="rounded-full border-2 border-secondary px-6 py-3 text-sm font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-last md:text-base"
          >
            Ke Halaman Login
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFound