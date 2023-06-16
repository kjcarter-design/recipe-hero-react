import React from 'react'
import { PAGE_PATHS } from '../../constants'
import Home from './Home'
import Recipe from './Recipe'
import { Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route key={'Home'} path={PAGE_PATHS.HOME} element={<Home/>} />
      <Route key={'Recipe'} path={PAGE_PATHS.RECIPE} element={<Recipe/>} />
    </Routes>
  )
}
