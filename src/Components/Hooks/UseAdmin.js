import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setisAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/allUsers/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setisAdmin(data.isAdmin);
                    setIsAdminLoading(false)
                })
        }
    }, [email])

    return [isAdmin, isAdminLoading]

}

export default useAdmin;