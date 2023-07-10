/* eslint-disable no-unused-vars */

const updateProductRequest = (values) => {
    localStorage.setItem('productRequests', JSON.stringify(values))
}
const updateCurrentUser = (values) => {
    localStorage.setItem('currentUser', JSON.stringify(values))
}
const addFeedBack = (newFeedback) => {
    return new Promise((resolve, reject) => {
        try{
            console.log(newFeedback)
            const productRequests = JSON.parse(localStorage.getItem('productRequests'))
            console.log("New product", productRequests);
            const id = productRequests.length + 1
            const feedback = {
                id,
                ...newFeedback
            }
            
            updateProductRequest(productRequests)
            setTimeout(() => {
                console.log("Added ", feedback)
                return resolve(productRequests)
            }, 250);
        }
        catch (error) {
            reject(new Error("Something wrong occured"))
        }
    })
}

const getProductRequests = () => {
    return new Promise((resolve, reject) => {
        const productRequests = JSON.parse(localStorage.getItem('productRequests'))
        if (!productRequests) {
            return setTimeout(
                () => reject(new Error("Suggestions not found"))
                , 250)
        }
        console.log(Object.values(productRequests));
        return setTimeout(() => {
            resolve(Object.values(productRequests))
        }, 250)
    })
}

const getUser = () => {
    return new Promise((resolve, reject) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (!currentUser) {
            return setTimeout(
                () => reject(new Error("Suggestions not found"))
                , 250)
        }
        console.log(Object.values(currentUser));
        return setTimeout(() => {
            resolve(currentUser)
        }, 250)
    })
}

const util = {
    addFeedBack,
    getProductRequests,
    getUser
}

export default util
