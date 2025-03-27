export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="alert alert-danger m-3">
      <h4 className="alert-heading">Something went wrong</h4>
      <p>{error.message}</p>
      <hr />
      <button onClick={resetErrorBoundary} className="btn btn-outline-danger">
        Try again
      </button>
    </div>
  )
}

