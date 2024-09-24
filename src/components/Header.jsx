import React, { useEffect, useState } from 'react'

export default function Header() {
    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
        .then(res => res.json())
        .then(data => {
            setDate(new Date(data.datetime).toLocaleDateString())
        })
    }, [])
    const [date, setDate] = useState("Date")
  return (
    <div>{date}</div>
  )
}
