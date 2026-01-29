import "../assets/loading.css";

const LoadingBar = ({ progress }) => {
  // if progress is undefined → indeterminate loader
  const isIndeterminate = progress === undefined;

  return (
    <div className="loading-container">
      <div
        className={`loading-bar ${isIndeterminate ? "indeterminate" : ""}`}
        style={!isIndeterminate ? { width: `${progress}%` } : {}}
      />
    </div>
  );
};

export default LoadingBar;
