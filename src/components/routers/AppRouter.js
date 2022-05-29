import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/' element={<CalendarScreen />} />
                <Route path='*' element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}
