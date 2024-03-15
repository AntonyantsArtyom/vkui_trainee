import { Text, Card, IconButton, Title, Spacing, Footnote, Div } from "@vkontakte/vkui"

import { Icon16Minus, Icon16Add, Icon16Delete } from "@vkontakte/icons"
import Store from "../Store"
import { observer } from "mobx-react-lite"
import Product from "../types/Product"
import Messages from "../types/Messages"

function ProductCard(product: Product) {
   return (
      <Card style={{ display: "flex", flexDirection: "column" }}>
         <img
            className="card_image"
            style={{ width: "100%", borderRadius: "var(--vkui--size_card_border_radius--regular)" }}
            src={product.thumbnail}
         />

         <Div>
            <Title level="2">{product.title}</Title>
            <Footnote>{product.description}</Footnote>
            <Spacing size={16} />
         </Div>
         <div style={{ flexShrink: 0, flexGrow: 1 }} />
         <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Text>цена: {product.price} руб.</Text>
         </Div>
         <Div style={{ display: "flex", justifyContent: "center", gap: "5px", paddingTop: 0 }}>
            <IconButton
               aria-label="удалить"
               onClick={() => {
                  Store.setConfirmActionText(Messages["SHOULD_DELETE"])
                  Store.setPickedProductId(product.id)
               }}
            >
               <Icon16Delete />
            </IconButton>
            <div style={{ display: "flex", alignItems: "center", width: "100px" }}>
               <IconButton aria-label="минус 1" onClick={() => Store.decreaseCount(product.id)}>
                  <Icon16Minus />
               </IconButton>
               <Text>{product.quantity}</Text>
               <IconButton aria-label="плюс 1" onClick={() => Store.increaseCount(product.id)}>
                  <Icon16Add />
               </IconButton>
            </div>
         </Div>
      </Card>
   )
}

export default observer(ProductCard)
