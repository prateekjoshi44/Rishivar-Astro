import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarRender from './SidebarRender'
import ForegroundFcm from '../firebase/ForegroundFcm'
import ForegroundCordovaFcm from '../firebase/ForegroundCordovaFcm'

const Layout = () => {

  const { pathname } = useLocation()


  useEffect(() => {
    const classList = document.body.classList
    if (classList.contains("modal-open")) classList.remove("modal-open")

    const backdrops = document.getElementsByClassName("modal-backdrop")
    for (const backdrop of backdrops) backdrop.remove()
  }, [pathname])


  useEffect(() => {
    document.addEventListener('deviceready', function () {
      // Check if the plugin is available
      console.log("local notification")


    }, false);



  }, [])




  return (
    <div className=' h-100 d-flex flex-column flex-lg-row overflow-hidden'>
      {/* <IncomingCall /> */}
      {window.cordova ? <ForegroundCordovaFcm /> : <ForegroundFcm />}
      <SidebarRender />
      <main className="flex-grow-1 overflow-auto">

        <Outlet />
      </main>
    </div>
  )
}

export default Layout