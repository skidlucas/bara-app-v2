import Image from 'next/image'
import desktopLogo from './logos/desktop-logo.svg'
import mobileLogo from './logos/mobile-logo.svg'

export default function BaraLogo({ isDesktop = true }: { isDesktop: boolean }) {
    if (isDesktop) {
        return <Image priority src={desktopLogo} alt="Bara logo" className="w-[160px]" />
    } else {
        return <Image priority src={mobileLogo} alt="Bara logo" />
    }
}
