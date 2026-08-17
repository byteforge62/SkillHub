import { LandingNavbar } from "../components/LandingNavbar"
import { HeroSection } from "../components/HeroSection"
import { ResourceSection } from "../components/ResourceSection"
import { LearningPathSection } from "../components/LearningPathSection"
import { WorkspaceSection } from "../components/WorkspaceSection"
import { EventsSection } from "../components/EventsSection"
import { LandingFooter } from "../components/LandingFooter"
import { ToolsSection } from "../components/ToolsSection"


export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar/>

      <main>
        <HeroSection/>
        <ResourceSection/>
        <LearningPathSection/>
        <WorkspaceSection/>
        <EventsSection/>
        <ToolsSection/>
      </main>

      <LandingFooter/>
    </div>
  )
}
