const Ball = ({ dynamicStyles }) => {
  return (
    <div className={`${dynamicStyles} absolute opacity-20 rounded-full blur-xl shadow-lg animate-moving z-0`}
      aria-hidden='true'
    ></div>
  )
}

export default Ball