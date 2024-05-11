import { TourGuideZone } from "rn-tourguide";
import { tourStepPropsMap } from '../data';

export default function TourStep({ children, stepKey }) {
    return (
        <TourGuideZone {...tourStepPropsMap[stepKey]}>
            {children}
        </TourGuideZone>
    )
}