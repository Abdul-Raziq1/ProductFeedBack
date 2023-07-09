import { currentUser, productRequests } from "./types"

const addFeedBack = async (newFeedback) => {
    try {
        const allProducts = await getProductRequests(productRequests)
        const id = allProducts.length + 1
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

const addComment = async (id, comment) => {
    try {
        const url = `${productRequests}/${id}`
        const suggestion = await getSuggestionWithId(id)
        const updatedComments = {...suggestion, comments: [...suggestion.comments, comment], numOfComments: suggestion.numOfComments + 1}
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComments)
        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const addReply = async (suggestionId, messageId, reply) => {
try {
        const url = `${productRequests}/${suggestionId}`
        const suggestion = await getSuggestionWithId(suggestionId)
        const updated = suggestion.comments.map((comment) => {
            if (comment.id === messageId){
                return {...comment, replies: [...comment.replies, reply]}
            }
            return comment
        })
        const updatedComments = {...suggestion, comments: updated, numOfComments: suggestion.numOfComments + 1}
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComments)
        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const editFeedback = async (id, editedFeedback) => {
    try {
        const url = `${productRequests}/${id}`
        // const suggestion = await getSuggestionWithId(id)

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedFeedback)
        })
        return response.json()
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const deleteFeedback = async (id) => {
    try {
        const url = `${productRequests}/${id}`
        // const suggestion = await getSuggestionWithId(id)

        await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const axiosUtil = {
    addFeedBack,
    addUpvote,
    addToLikes,
    addComment,
    addReply,
    deleteFeedback,
    editFeedback,
    getProductRequests,
    getUser,
    removeFromLikes
}
export default axiosUtil
