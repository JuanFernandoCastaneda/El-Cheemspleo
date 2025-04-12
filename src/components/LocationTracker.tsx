import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';

type LocationTrackerProps = {
  setLastUrl: React.Dispatch<React.SetStateAction<string>>
}

function LocationTracker({setLastUrl}: LocationTrackerProps) {
  const lastUrl = useRef("/")
  const location = useLocation()

  useEffect(() => {
    setLastUrl(lastUrl.current)
    lastUrl.current = location.pathname + location.hash + location.search
  }, [location])

  return <Outlet/>
}

export default LocationTracker