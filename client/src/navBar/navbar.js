import Cookies from 'js-cookie'
import { useState , useEffect } from 'react'
import { Link } from 'react'

export function NavBar() {
    const userId = Cookies.get('userId')
            return <>
                <h1>THis is navbar</h1>
            </>

}