import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-[#eee] min-h-screen overflow-hidden">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp