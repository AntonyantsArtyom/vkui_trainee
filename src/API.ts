import ErrorNames from "./types/ApiErrors"
import Product from "./types/Product"

class API {
   url = "https://dummyjson.com/carts/1"

   throwApiError(message: ErrorNames) {
      throw new Error(message)
   }

   async getProducts() {
      let products: Product[] = []
      let res: Response | null = null
      try {
         res = await fetch(this.url)
      } catch (error) {
         this.throwApiError("INTERNET_ERROR")
      }
      if (!res!.ok) this.throwApiError("SERVER_ERROR")

      products = await res!.json().then((res) => res.products)
      products.forEach((product) => (product.description = "Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum".repeat(3 * Math.random() + 1)))
      return products
   }
}

export default new API()
