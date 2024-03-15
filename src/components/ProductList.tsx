import { Group, Spacing } from "@vkontakte/vkui"
import ProductCard from "./ProductCard"
import { observer } from "mobx-react-lite"
import Store from "../Store"
import { useWindowSize } from "@uidotdev/usehooks"

function ProductList() {
   const size = useWindowSize()
   return (
      <Group>
         <Spacing size={5} />
         <div className="styledScroll" style={{ height: "80vh", overflowY: "auto", paddingLeft: "5px", paddingRight: "5px" }}>
            <div
               style={{
                  display: "grid",
                  gap: "5px",
                  gridTemplateColumns: `1fr `.repeat(size.width! > 1200 ? 4 : size.width! > 900 ? 3 : size.width! > 600 ? 2 : 1),
               }}
            >
               {Store.products.map((product) => (
                  <ProductCard key={product.id} {...product} />
               ))}
            </div>
         </div>
      </Group>
   )
}

export default observer(ProductList)
