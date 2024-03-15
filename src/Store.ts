import { makeAutoObservable, runInAction } from "mobx"
import API from "./API"
import Product from "./types/Product"
import Messages from "./types/Messages"
import ErrorNames from "./types/ApiErrors"

function timer(ms: number) {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve("")
      }, ms)
   })
}

class Store {
   requestStatus: "loading" | "cancelable" | "done" | "error" | undefined
   errorText: string = ""
   confirmActionText: string = ""
   pickedProductId: number = -1
   products: Product[] = []
   mode: "dark" | "light" = "dark"
   maxLimit = 10
   minLimit = 1
   constructor() {
      makeAutoObservable(this)
      this.fillInitialProducts()
   }

   changeMode() {
      if (this.mode === "dark") this.mode = "light"
      else this.mode = "dark"
   }
   async fillInitialProducts() {
      this.requestStatus = "loading"
      try {
         const products = await API.getProducts()
         runInAction(() => (this.products = products))
         runInAction(() => (this.requestStatus = "done"))
         await timer(1000)
         this.clearRequestStatus()
      } catch (error) {
         if (error instanceof Error) {
            await timer(200)
            runInAction(() => (this.requestStatus = "error"))
            await timer(200)
            this.clearRequestStatus()
            this.errorText = Messages[error.message as keyof typeof Messages]
         }
      }
   }
   clearRequestStatus() {
      this.requestStatus = undefined
   }

   increaseCount(id: number) {
      if (this.products.find((product) => product.id === id)!["quantity"] === this.maxLimit) {
         this.errorText = Messages["MAX_LIMIT"]
         return
      }
      this.products.find((product) => product.id === id)!["quantity"]++
   }

   decreaseCount(id: number) {
      if (this.products.find((product) => product.id === id)!["quantity"] === this.minLimit) {
         this.errorText = Messages["MIN_LIMIT"]
         return
      }
      this.products.find((product) => product.id === id)!["quantity"]--
   }

   deleteProduct(id: number) {
      this.products = this.products.filter((product) => product.id !== id)
   }

   get totalPrice() {
      let total = 0
      this.products.forEach((product) => (total += product.price * product.quantity))
      return total
   }

   clearErrorText() {
      this.errorText = ""
   }
   setErrorText(message: ErrorNames) {
      this.errorText = message
   }
   clearConfirmActionText() {
      this.confirmActionText = ""
   }
   setConfirmActionText(message: Messages) {
      this.confirmActionText = message
   }
   setPickedProductId(id: number) {
      this.pickedProductId = id
   }
}

export default new Store()
