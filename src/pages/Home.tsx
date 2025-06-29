import React from 'react'
import { Hero } from '../components/Hero'
import { VisionMission } from '../components/VisionMission'
import { Gallery } from '../components/Gallery'

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <VisionMission />
      <Gallery />
    </div>
  )
}