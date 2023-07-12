import { redirect } from "react-router-dom";
import localData from "./data.json";

const updateProductRequest = (values) => {
    localStorage.setItem('productRequests', JSON.stringify(values))
}

const updateProductRequestWithID = (id, suggestion) => {

    let productRequests = JSON.parse(localStorage.getItem('productRequests'))
    productRequests = productRequests.map((request) => {
        if (request.id === id) {
            return suggestion
        }
        return request
    })
    localStorage.setItem('productRequests', JSON.stringify(productRequests))
}
const updateCurrentUser = (values) => {
    localStorage.setItem('currentUser', JSON.stringify(values))
}
const addFeedBack = (newFeedback) => {
    return new Promise((resolve, reject) => {
        try {
            let productRequests = JSON.parse(localStorage.getItem('productRequests'))
            const id = productRequests.length + 1
            const feedback = {
                id,
                ...newFeedback
            }
            productRequests = [ ...productRequests, feedback ]
            updateProductRequest(productRequests)
            setTimeout(() => {
                return resolve(productRequests)
            }, 250);
        }
        catch (error) {
            reject(new Error("Something wrong occured"))
        }
    })
}
const addComment = (id, comment) => {
    return new Promise((resolve, reject) => {
        getSuggestionWithId(id)
            .then((suggestion) => {
                const updatedComments = { ...suggestion, comments: [...suggestion.comments, comment], numOfComments: suggestion.numOfComments + 1 }
                setTimeout(() => {
                    updateProductRequestWithID(id, updatedComments)
                    resolve(updatedComments)
                }, 250);
            })
            .catch(() => {
                return setTimeout(() => {
                    reject("Could not find the feedback. It may have been deleted. Please reload the screen")
                }, 250);
            })
    })
}

const addToLikes = async (id) => {
    try {
        const user = await getUser()
        const updatedUser = { ...user, likes: { ...user.likes, [id]: id } }
        updateCurrentUser(updatedUser)
        return updatedUser
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const addUpvote = async (id, operation) => {
    try {
        const feedback = await getSuggestionWithId(id)
        let updatedFeedback;
        if (operation === 'decrement') {
            updatedFeedback = { ...feedback, upvotes: feedback.upvotes - 1 }
        } else {
            updatedFeedback = { ...feedback, upvotes: feedback.upvotes + 1 }
        }
        updateProductRequestWithID(id, updatedFeedback)
        return updatedFeedback
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const removeFromLikes = async (id) => {
    try {
        const user = await getUser()
        delete user.likes[id]
        updateCurrentUser(user)
        return user
    }
     catch (error) {
        console.log("Error:", error);
    }
}

const addReply = async (suggestionId, messageId, reply) => {
    try {
        const suggestion = await getSuggestionWithId(suggestionId)
        const updated = suggestion.comments.map((comment) => {
            if (comment.id === messageId){
                return {...comment, replies: [...comment.replies, reply]}
            }
            return comment
        })
        const updatedReplies = {...suggestion, comments: updated, numOfComments: suggestion.numOfComments + 1}
        updateProductRequestWithID(suggestionId, updatedReplies)
        return updatedReplies
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const editFeedback = async (id, editedFeedback) => {
    try {
        updateProductRequestWithID(id, editedFeedback)
        return editFeedback
    }
    catch (error) {
        console.log("Error:", error);
    }
}

const deleteFeedback = async (id) => {
    let productRequests = JSON.parse(localStorage.getItem('productRequests'))
    productRequests = productRequests.filter((request) => request.id !== id)
    localStorage.setItem('productRequests', JSON.stringify(productRequests))
}

const getProductRequests = () => {
    return new Promise((resolve, reject) => {
        const productRequests = JSON.parse(localStorage.getItem("productRequests")) || localData.productRequests
        localStorage.setItem("productRequests", JSON.stringify(productRequests))
        if (productRequests === undefined) {
            return setTimeout(
                () => reject(new Error("Suggestions not found"))
                , 250)
        }
        return setTimeout(() => {
            resolve(productRequests)
        }, 250)
    })
}

const getUser = () => {
    return new Promise((resolve, reject) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || localData.currentUser
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        if (currentUser === undefined) {
            return setTimeout(
                () => reject(new Error("User not found"))
                , 250)
        }
        return setTimeout(() => {
            resolve(currentUser)
        }, 250)
    })
}

const getSuggestionWithId = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let productRequests = JSON.parse(localStorage.getItem('productRequests'))
            const suggestion = productRequests[id - 1]
            return setTimeout(() => {
                resolve(suggestion)
            }, 250);
        } catch (error) {
            return setTimeout(() => {
                reject(redirect(`/error/${id}`))
            }, 250);
        }
    })
}
const util = {
    addFeedBack,
    addComment,
    addUpvote,
    addToLikes,
    addReply,
    editFeedback,
    deleteFeedback,
    removeFromLikes,
    getProductRequests,
    getUser,
    getSuggestionWithId
}

export default util
