import React from 'react'
import { Hero } from '../components/Hero'
import { VisionMission } from '../components/VisionMission'
import { Gallery } from '../components/Gallery'
import { HomeHeadmaster } from '../components/HomeHeadmaster';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <VisionMission />
      <HomeHeadmaster />
      <Gallery />
    </div>
  )
}