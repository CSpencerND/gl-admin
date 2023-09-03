import { useEffect } from "react"

export const useLog = (string: any, dependency: any = null) => {
    useEffect(() => {
        console.log(string)
    }, [dependency])
}
