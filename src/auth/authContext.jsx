import { useEffect, useState, useRef, useCallback } from "react"
import { refreshToken, logout as logoutApi } from "../api/authApi"
import { tokenStore } from "./token"
import { AuthContext } from "./useAuth"

const TIMEOUT_MS = 5000
const RETRY_INTERVAL_MS = 3000
const MAX_RETRIES = 10

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const didRun = useRef(false)
    const retryRef = useRef(null)

    const clearRetry = () => {
        if (retryRef.current) {
            clearInterval(retryRef.current)
            retryRef.current = null
        }
    }

    const applyAuthSuccess = useCallback((data) => {
        tokenStore.set(data.accessToken)
        setUser(data)
        clearRetry()
    }, [])

    const retryInBackground = useCallback(() => {
        let attempts = 0
        retryRef.current = setInterval(async () => {
            attempts++
            if (attempts > MAX_RETRIES) {
                clearRetry()
                return
            }
            try {
                const res = await refreshToken()
                applyAuthSuccess(res.data.data)
            } catch {
                // still waking up, keep retrying
            }
        }, RETRY_INTERVAL_MS)
    }, [applyAuthSuccess])

    useEffect(() => {
        if (didRun.current) return
        didRun.current = true

        const initAuth = async () => {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

            try {
                const res = await refreshToken(controller.signal)
                applyAuthSuccess(res.data.data)
            } catch (e) {
                tokenStore.clear()
                setUser(null)
                if (e.name === "AbortError" || e.code === "ERR_CANCELED") {
                    retryInBackground()
                }
            } finally {
                clearTimeout(timeout)
                setLoading(false)
            }
        }

        initAuth()

        return () => clearRetry()
    }, [applyAuthSuccess, retryInBackground])

    const logout = async () => {
        clearRetry()
        await logoutApi()
        tokenStore.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}