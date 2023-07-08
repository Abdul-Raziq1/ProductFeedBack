import { currentUser, productRequests } from "./types"

import { v4 as uuid } from "uuid"
const addFeedBack = async (newFeedback) => {
    try {
        const id = uuid()
        await fetch(productRequests, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newFeedback, id })
        })
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const getSuggestionWithId = async (id) => {
    try {
        const url = `${productRequests}/${id}`
        const response = await fetch(url)
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const getProductRequests = async () => {
    try {
        const response = await fetch(productRequests)
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const getUser = async () => {
    try {
        const response = await fetch(currentUser)
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const addToLikes = async (id) => {
    try {

        const user = await getUser()
        const updatedUser = { ...user, likes: { ...user.likes, [id]: id } }
        const response = await fetch(currentUser, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}
const removeFromLikes = async (id) => {
    try {

        const user = await getUser()
        delete user.likes[id]
        const response = await fetch(currentUser, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const addUpvote = async (id, operation) => {
    try {
        const url = `${productRequests}/${id}`
        const feedback = await getSuggestionWithId(id)
        let updatedFeedback;
        if (operation === 'decrement') {
            updatedFeedback = { ...feedback, upvotes: feedback.upvotes - 1 }
        } else {
            updatedFeedback = { ...feedback, upvotes: feedback.upvotes + 1 }
        }
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFeedback)

        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const axiosUtil = {
    addFeedBack,
    addUpvote,
    addToLikes,
    getProductRequests,
    getUser,
    removeFromLikes
}
export default axiosUtil
