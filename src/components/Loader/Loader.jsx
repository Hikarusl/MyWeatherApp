import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loader = () => {
    return (
    <div className="loading"
         style={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           backgroundColor: "transparent"
         }}>
      <img src="/animations/Loading.gif"
           alt="loading"
           style={{ width: 150, height: 150 }} />
    </div>
  )
}

export default Loader