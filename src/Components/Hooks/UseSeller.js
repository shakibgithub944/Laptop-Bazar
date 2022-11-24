import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setisSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/allUsers/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setisSeller(data.isSeller);
                    setIsSellerLoading(false)
                })
        }
    }, [email])

    return [isSeller, isSellerLoading]

}

export default useSeller;