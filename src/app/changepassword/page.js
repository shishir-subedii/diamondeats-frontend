'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        console.clear()
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const fetchData = await fetch('http://localhost:5000/api/auth/changepass', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, newPassword })
            })
            const data = await fetchData.json()
            if(data.success){
                alert(data.message)
                router.push('/login')
            }
            else{
                alert(data.message)
                router.refresh()
            }

        } catch (error) {
            //(error);
        }
    }

    return (
        <main className={styles.changePassPage}>
            <section className={styles.changePassword}>
                <form>
                    <div className={styles.formGroup}>
                        <label for="currentPasswordInput">Email:</label>
                        <input type="email" id="currentPasswordInput" name="currentPassword" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label for="currentPasswordInput">Current Password:</label>
                        <input type="password" id="currentPasswordInput" name="currentPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label for="newPasswordInput">New Password:</label>
                        <input type="password" id="newPasswordInput" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>

                    <button type="submit" onClick={handleSubmit}>Change Password</button>
                </form>
            </section>
        </main>

    )
}

export default Page