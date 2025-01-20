export const PageLoader = ({ isLoading = false }) => {
  if (!isLoading) return null
  return (
    <>
      <div className="overlay" id="overlay"></div>
      <div className="loader">
        <div className="loader-cube">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>
      </div>
    </>
  )
}
