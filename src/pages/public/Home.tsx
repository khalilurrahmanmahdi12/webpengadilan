import AnnouncementSection from '../../components/home/AnnouncementSection'
import DocumentSection from '../../components/home/DocumentSection'
import HeroSection from '../../components/home/HeroSection'
import LegalServicesSection from '../../components/home/LegalServicesSection'
import NewsSection from '../../components/home/NewsSection'
import PtspSection from '../../components/home/PtspSection'
import PublicInformationSection from '../../components/home/PublicInformationSection'
import QuickAccess from '../../components/home/QuickAccess'
import ScheduleSection from '../../components/home/ScheduleSection'
import StatisticsSection from '../../components/home/StatisticsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickAccess />
      <PtspSection />
      <LegalServicesSection />
      <NewsSection />
      <AnnouncementSection />
      <ScheduleSection />
      <StatisticsSection />
      <PublicInformationSection />
      <DocumentSection />
    </>
  )
}