import { useEffect } from "react"

const SplashScreen = ({ setIsSplashed }) => {


    useEffect(() => {
        setTimeout(() => { setIsSplashed(false) }, 3000)
    }, [])

    return (
        <div className="h-100 w-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center" style={{ zIndex: 10, backgroundColor: "#F3EED4" }}>
            <img src="/android-chrome-512x512.png" className="vanishIn" style={{ height: 250, width: 250, objectFit: "contain" }} alt="" ></img>

        </div>
    )
}

export default SplashScreen;



