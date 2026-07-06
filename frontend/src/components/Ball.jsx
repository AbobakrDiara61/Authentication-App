const Ball = ({ dynamicStyles, opacity = 'opacity-20' }) => {
  return (
    <div className={`${dynamicStyles} absolute ${opacity} rounded-full blur-xl shadow-lg z-0`}
      aria-hidden='true'
    ></div>
  )
}

export default Ball