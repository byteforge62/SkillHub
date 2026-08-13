import { LandingNavbar } from "../components/LandingNavbar"
import { HeroSection } from "../components/HeroSection"
import { ResourceSection } from "../components/ResourceSection"
import { LearningPathSection } from "../components/LearningPathSection"
import { WorkspaceSection } from "../components/WorkspaceSection"
import { LandingFooter } from "../components/LandingFooter"


export const LandingPage = () => {
  return (
    <div>
      <LandingNavbar/>

      <main>
        <HeroSection/>
        <ResourceSection/>
        <LearningPathSection/>
        <WorkspaceSection/>
      </main>

      <LandingFooter/>
    </div>
  )
}
